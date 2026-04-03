import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBlock,
  updateBlock,
  getAllBlocks,
} from "../../redux/actions/contentBlockActions";
import { reset, setBlock } from "../../redux/slice/contentBlockSlice";
import Layout from "../../components/Layout/Layout";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import "./ContentBlocks.css";

const AddEditBlock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blocks, loading, success, error } = useSelector(
    (state) => state.contentBlock
  );
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    blockType: "why-choose",
    title: "",
    subtitle: "",
    description: "",
    image: null,
    buttonText: "Learn More",
    buttonLink: "/contact",
    buttonType: "primary",
    items: [],
    settings: {
      layout: "grid",
      columns: 3,
      backgroundColor: "#ffffff",
      textColor: "#2a0f45",
      showTitle: true,
      showSubtitle: true,
    },
    order: 0,
    isActive: true,
  });

  const [currentItem, setCurrentItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  useEffect(() => {
    if (isEdit) {
      dispatch(getAllBlocks());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (isEdit && blocks?.length > 0) {
      const block = blocks.find((b) => b._id === id);
      if (block) {
        setFormData({
          blockType: block.blockType,
          title: block.title || "",
          subtitle: block.subtitle || "",
          description: block.description || "",
          image: null,
          buttonText: block.buttonText || "Learn More",
          buttonLink: block.buttonLink || "/contact",
          buttonType: block.buttonType || "primary",
          items: block.items || [],
          settings: block.settings || {
            layout: "grid",
            columns: 3,
            backgroundColor: "#ffffff",
            textColor: "#2a0f45",
            showTitle: true,
            showSubtitle: true,
          },
          order: block.order || 0,
          isActive: block.isActive !== undefined ? block.isActive : true,
        });
      }
    }
  }, [isEdit, blocks, id]);

  useEffect(() => {
    if (success) {
      toast.success(
        isEdit ? "Block updated successfully!" : "Block added successfully!"
      );
      dispatch(reset());
      navigate("/admin/content-blocks");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes("settings.")) {
      const settingKey = name.split(".")[1];
      setFormData({
        ...formData,
        settings: { ...formData.settings, [settingKey]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleItemChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setCurrentItem({ ...currentItem, [name]: files[0] });
    } else if (type === "checkbox") {
      setCurrentItem({ ...currentItem, [name]: checked });
    } else {
      setCurrentItem({ ...currentItem, [name]: value });
    }
  };

  const openItemModal = (item = null) => {
    if (item) {
      setCurrentItem(item);
    } else {
      setCurrentItem({
        title: "",
        description: "",
        image: null,
        icon: "",
        link: "",
        buttonText: "",
        order: formData.items.length,
        isActive: true,
      });
    }
    setShowItemModal(true);
  };

  const saveItem = () => {
    if (!currentItem.title) {
      toast.error("Item title is required");
      return;
    }

    let updatedItems;
    if (currentItem._id) {
      // Update existing item
      updatedItems = formData.items.map((item) =>
        item._id === currentItem._id ? currentItem : item
      );
    } else {
      // Add new item
      updatedItems = [...formData.items, { ...currentItem, _id: Date.now() }];
    }
    setFormData({ ...formData, items: updatedItems });
    setShowItemModal(false);
    setCurrentItem(null);
  };

  const removeItem = (itemId) => {
    const updatedItems = formData.items.filter((item) => item._id !== itemId);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("blockType", formData.blockType);
    submitData.append("title", formData.title);
    submitData.append("subtitle", formData.subtitle);
    submitData.append("description", formData.description);
    submitData.append("buttonText", formData.buttonText);
    submitData.append("buttonLink", formData.buttonLink);
    submitData.append("buttonType", formData.buttonType);
    submitData.append("order", formData.order);
    submitData.append("isActive", formData.isActive);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    // Send items as JSON string
    submitData.append("items", JSON.stringify(formData.items));
    submitData.append("settings", JSON.stringify(formData.settings));

    if (isEdit) {
      dispatch(updateBlock({ id, formData: submitData }));
    } else {
      dispatch(addBlock(submitData));
    }
  };

  const blockTypes = [
    { value: "why-choose", label: "Why Choose Us" },
    { value: "facility", label: "Facilities" },
    { value: "our-work", label: "Our Work" },
    { value: "key-facts", label: "Key Facts" },
    { value: "testimonial", label: "Testimonials" },
    { value: "hero", label: "Hero Section" },
    { value: "cta", label: "Call to Action" },
    { value: "feature", label: "Features" },
    { value: "team", label: "Team Members" },
    { value: "gallery", label: "Gallery" },
    { value: "partner", label: "Partners" },
    { value: "service", label: "Services" },
  ];

  return (
    <Layout>
      <div className="add-edit-block-page">
        <div className="page-header">
          <button
            onClick={() => navigate("/admin/content-blocks")}
            className="back-btn"
          >
            <FiArrowLeft />
            Back to Blocks
          </button>
          <h2>{isEdit ? "Edit Block" : "Add New Block"}</h2>
        </div>

        <div className="block-form-card">
          <form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label>Block Type *</label>
                <select
                  name="blockType"
                  value={formData.blockType}
                  onChange={handleChange}
                  required
                >
                  {blockTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Main Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
                {isEdit && !formData.image && (
                  <small className="form-hint">
                    Leave empty to keep current image
                  </small>
                )}
              </div>
            </div>

            {/* Button Settings */}
            <div className="form-section">
              <h3>Button Settings</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Button Text</label>
                  <input
                    type="text"
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Button Link</label>
                  <input
                    type="text"
                    name="buttonLink"
                    value={formData.buttonLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Button Type</label>
                  <select
                    name="buttonType"
                    value={formData.buttonType}
                    onChange={handleChange}
                  >
                    <option value="primary">Primary (Teal)</option>
                    <option value="secondary">Secondary (Red)</option>
                    <option value="tertiary">Tertiary (Purple)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items Management */}
            <div className="form-section">
              <div className="section-header-with-button">
                <h3>Items / Cards</h3>
                <button
                  type="button"
                  className="add-item-btn"
                  onClick={() => openItemModal()}
                >
                  <FiPlus /> Add Item
                </button>
              </div>

              {formData.items.length === 0 ? (
                <p className="empty-items">
                  No items added yet. Click "Add Item" to create cards.
                </p>
              ) : (
                <div className="items-table-wrapper">
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, idx) => (
                        <tr key={item._id}>
                          <td>
                            {item.image ? (
                              <img
                                src={
                                  item.image.startsWith("data:")
                                    ? item.image
                                    : `data:image/jpeg;base64,${item.image}`
                                }
                                alt={item.title}
                                className="item-thumb"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <div className="no-image">No image</div>
                            )}
                          </td>
                          <td className="item-title-cell">{item.title}</td>
                          <td className="item-desc-cell">
                            {item.description?.substring(0, 60)}...
                          </td>
                          <td>{item.order || idx + 1}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                item.isActive !== false ? "active" : "inactive"
                              }`}
                            >
                              {item.isActive !== false ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="action-buttons">
                            <button
                              type="button"
                              className="action-btn edit-btn"
                              onClick={() => openItemModal(item)}
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              type="button"
                              className="action-btn delete-btn"
                              onClick={() => removeItem(item._id)}
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Layout Settings */}
            <div className="form-section">
              <h3>Layout Settings</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Layout</label>
                  <select
                    name="settings.layout"
                    value={formData.settings.layout}
                    onChange={handleChange}
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="carousel">Carousel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Columns (for grid)</label>
                  <input
                    type="number"
                    name="settings.columns"
                    value={formData.settings.columns}
                    onChange={handleChange}
                    min="1"
                    max="4"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Background Color</label>
                  <input
                    type="color"
                    name="settings.backgroundColor"
                    value={formData.settings.backgroundColor}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Text Color</label>
                  <input
                    type="color"
                    name="settings.textColor"
                    value={formData.settings.textColor}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row checkbox-row">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="settings.showTitle"
                      checked={formData.settings.showTitle}
                      onChange={handleChange}
                    />
                    Show Title
                  </label>
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="settings.showSubtitle"
                      checked={formData.settings.showSubtitle}
                      onChange={handleChange}
                    />
                    Show Subtitle
                  </label>
                </div>
              </div>
            </div>

            {/* Order & Status */}
            <div className="form-section">
              <h3>Order & Status</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                    />
                    Active (visible on website)
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/admin/content-blocks")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Block" : "Add Block"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Item Modal */}
      {showItemModal && (
        <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
          <div
            className="modal-content item-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{currentItem?._id ? "Edit Item" : "Add New Item"}</h3>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={currentItem?.title || ""}
                onChange={handleItemChange}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="3"
                value={currentItem?.description || ""}
                onChange={handleItemChange}
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleItemChange}
              />
              {currentItem?.image && !currentItem.image.startsWith("data:") && (
                <small className="form-hint">
                  Current image will be replaced
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Icon (FontAwesome class)</label>
              <input
                type="text"
                name="icon"
                value={currentItem?.icon || ""}
                onChange={handleItemChange}
                placeholder="e.g., fas fa-heart"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Link URL</label>
                <input
                  type="text"
                  name="link"
                  value={currentItem?.link || ""}
                  onChange={handleItemChange}
                />
              </div>
              <div className="form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  name="buttonText"
                  value={currentItem?.buttonText || ""}
                  onChange={handleItemChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  name="order"
                  value={currentItem?.order || 0}
                  onChange={handleItemChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={currentItem?.isActive !== false}
                    onChange={handleItemChange}
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowItemModal(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="button" onClick={saveItem} className="submit-btn">
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AddEditBlock;
