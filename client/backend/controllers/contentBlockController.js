import contentBlockModel from "../models/contentBlockModel.js";

// ============= PUBLIC ROUTES =============

// GET all active blocks (ordered)
export const getActiveBlocksController = async (req, res) => {
  try {
    const blocks = await contentBlockModel
      .find({ isActive: true })
      .sort({ order: 1 });

    res.status(200).send({
      success: true,
      blocks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blocks",
      error: error.message,
    });
  }
};

// GET blocks by type
export const getBlocksByTypeController = async (req, res) => {
  try {
    const { type } = req.params;
    const blocks = await contentBlockModel
      .find({ blockType: type, isActive: true })
      .sort({ order: 1 });

    res.status(200).send({
      success: true,
      blocks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blocks",
      error: error.message,
    });
  }
};

// GET single block by ID (for details page)
export const getBlockByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const block = await contentBlockModel.findById(id);

    if (!block) {
      return res.status(404).send({
        success: false,
        message: "Block not found",
      });
    }

    res.status(200).send({
      success: true,
      block,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching block",
      error: error.message,
    });
  }
};

// ============= ADMIN ROUTES =============

// GET all blocks (admin - includes inactive)
export const getAllBlocksController = async (req, res) => {
  try {
    const blocks = await contentBlockModel.find().sort({ order: 1 });

    res.status(200).send({
      success: true,
      blocks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blocks",
      error: error.message,
    });
  }
};

// ADD new block
export const addBlockController = async (req, res) => {
  try {
    const {
      blockType,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      buttonType,
      items,
      settings,
      order,
      isActive,
    } = req.body;

    // Handle main image
    let imageBase64 = "";
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    // Handle items images if any
    let parsedItems = [];
    if (items) {
      parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    }

    const block = new contentBlockModel({
      blockType,
      title: title || "",
      subtitle: subtitle || "",
      description: description || "",
      image: imageBase64,
      buttonText: buttonText || "Learn More",
      buttonLink: buttonLink || "/doctors",
      buttonType: buttonType || "primary",
      items: parsedItems,
      settings: settings
        ? typeof settings === "string"
          ? JSON.parse(settings)
          : settings
        : {},
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    await block.save();

    res.status(201).send({
      success: true,
      message: "Block added successfully",
      block,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding block",
      error: error.message,
    });
  }
};

// UPDATE block
export const updateBlockController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      blockType,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      buttonType,
      items,
      settings,
      order,
      isActive,
    } = req.body;

    const updateData = {
      blockType,
      title,
      subtitle,
      description,
      buttonText,
      buttonLink,
      buttonType,
      order,
      isActive,
    };

    // Handle main image
    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    // Handle items
    if (items) {
      updateData.items = typeof items === "string" ? JSON.parse(items) : items;
    }

    // Handle settings
    if (settings) {
      updateData.settings =
        typeof settings === "string" ? JSON.parse(settings) : settings;
    }

    const block = await contentBlockModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!block) {
      return res.status(404).send({
        success: false,
        message: "Block not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Block updated successfully",
      block,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating block",
      error: error.message,
    });
  }
};

// DELETE block
export const deleteBlockController = async (req, res) => {
  try {
    const { id } = req.params;
    await contentBlockModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Block deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting block",
      error: error.message,
    });
  }
};

// REORDER blocks (drag and drop)
export const reorderBlocksController = async (req, res) => {
  try {
    const { blocks } = req.body; // [{ id, order }]

    const updatePromises = blocks.map((block) =>
      contentBlockModel.findByIdAndUpdate(block.id, { order: block.order })
    );

    await Promise.all(updatePromises);

    res.status(200).send({
      success: true,
      message: "Blocks reordered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error reordering blocks",
      error: error.message,
    });
  }
};
