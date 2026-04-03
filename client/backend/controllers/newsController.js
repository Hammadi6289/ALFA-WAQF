import newsModel from "../models/newsModel.js";

// ============= PUBLIC ROUTES =============

// GET all news (paginated)
export const getAllNewsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const news = await newsModel
      .find({ isActive: true })
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await newsModel.countDocuments({ isActive: true });

    res.status(200).send({
      success: true,
      news,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// GET single news by slug
export const getNewsBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;
    const news = await newsModel.findOne({ slug, isActive: true });

    if (!news) {
      return res.status(404).send({
        success: false,
        message: "News not found",
      });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.status(200).send({
      success: true,
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// GET latest news (for sidebar/widget)
export const getLatestNewsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const news = await newsModel
      .find({ isActive: true })
      .sort({ publishedDate: -1 })
      .limit(limit)
      .select("title slug image publishedDate");

    res.status(200).send({
      success: true,
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching latest news",
      error: error.message,
    });
  }
};

// ============= ADMIN ROUTES =============

// GET all news (admin - includes inactive)
export const getAllNewsAdminController = async (req, res) => {
  try {
    const news = await newsModel.find().sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// ADD news
export const addNewsController = async (req, res) => {
  try {
    const { title, content, category, publishedDate, isActive } = req.body;

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Check if slug already exists
    const existingNews = await newsModel.findOne({ slug });
    if (existingNews) {
      return res.status(400).send({
        success: false,
        message: "News with similar title already exists",
      });
    }

    // Handle image
    let imageBase64 = "";
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    const news = new newsModel({
      title,
      slug,
      content,
      image: imageBase64,
      category: category || "general",
      publishedDate: publishedDate || Date.now(),
      isActive: isActive !== undefined ? isActive : true,
    });

    await news.save();

    res.status(201).send({
      success: true,
      message: "News added successfully",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding news",
      error: error.message,
    });
  }
};

// UPDATE news
export const updateNewsController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, publishedDate, isActive } = req.body;

    const updateData = {
      title,
      content,
      category,
      publishedDate,
      isActive,
    };

    // Update slug if title changed
    if (title) {
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }

    // Handle image
    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const news = await newsModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!news) {
      return res.status(404).send({
        success: false,
        message: "News not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "News updated successfully",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating news",
      error: error.message,
    });
  }
};

// DELETE news
export const deleteNewsController = async (req, res) => {
  try {
    const { id } = req.params;
    await newsModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting news",
      error: error.message,
    });
  }
};
