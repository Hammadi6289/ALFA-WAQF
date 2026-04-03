import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlocks,
  deleteBlock,
  reorderBlocks,
} from "../../redux/actions/contentBlockActions";
import { reset } from "../../redux/slice/contentBlockSlice";
import Layout from "../../components/Layout/Layout";
import { FiEdit2, FiTrash2, FiPlus, FiMoreVertical } from "react-icons/fi";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./ContentBlocks.css";

const ContentBlocks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blocks, loading, success, error } = useSelector(
    (state) => state.contentBlock
  );
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    dispatch(getAllBlocks());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (blocks) {
      setBlockList(blocks);
    }
  }, [blocks]);

  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully");
      dispatch(getAllBlocks());
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this block?")) {
      dispatch(deleteBlock(id));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedBlocks = Array.from(blockList);
    const [removed] = reorderedBlocks.splice(result.source.index, 1);
    reorderedBlocks.splice(result.destination.index, 0, removed);

    const updatedBlocks = reorderedBlocks.map((block, index) => ({
      id: block._id,
      order: index,
    }));

    setBlockList(reorderedBlocks);
    dispatch(reorderBlocks(updatedBlocks));
  };

  const blockTypeLabels = {
    "why-choose": "Why Choose Us",
    facility: "Facilities",
    "our-work": "Our Work",
    "key-facts": "Key Facts",
    testimonial: "Testimonials",
    hero: "Hero Section",
    cta: "Call to Action",
    feature: "Features",
    team: "Team Members",
    gallery: "Gallery",
    partner: "Partners",
    service: "Services",
  };

  return (
    <Layout>
      <div className="content-blocks-page">
        <div className="page-header">
          <div>
            <h2>Content Blocks</h2>
            <p>Manage all dynamic content blocks on your website</p>
          </div>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/content-blocks/add")}
          >
            <FiPlus />
            Add New Block
          </button>
        </div>

        <div className="blocks-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : blockList?.length === 0 ? (
            <div className="empty-state">
              <p>No content blocks yet. Click "Add New Block" to create one.</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="blocks">
                {(provided) => (
                  <table
                    className="blocks-table"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "50px" }}></th>
                        <th>Block Type</th>
                        <th>Title</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blockList.map((block, index) => (
                        <Draggable
                          key={block._id}
                          draggableId={block._id}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <td
                                className="drag-handle"
                                {...provided.dragHandleProps}
                              >
                                <FiMoreVertical />
                              </td>
                              <td>
                                <span className="block-type-badge">
                                  {blockTypeLabels[block.blockType] ||
                                    block.blockType}
                                </span>
                              </td>
                              <td className="title-cell">
                                {block.title || "—"}
                              </td>
                              <td>{block.items?.length || 0} items</td>
                              <td>
                                <span
                                  className={`status-badge ${
                                    block.isActive ? "active" : "inactive"
                                  }`}
                                >
                                  {block.isActive ? "Active" : "Inactive"}
                                </span>
                              </td>
                              <td>
                                {new Date(block.createdAt).toLocaleDateString()}
                              </td>
                              <td className="action-buttons">
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/admin/content-blocks/edit/${block._id}`
                                    )
                                  }
                                  className="action-btn edit-btn"
                                  title="Edit"
                                >
                                  <FiEdit2 />
                                </button>
                                <button
                                  onClick={() => handleDelete(block._id)}
                                  className="action-btn delete-btn"
                                  title="Delete"
                                >
                                  <FiTrash2 />
                                </button>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ContentBlocks;
