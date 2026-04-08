import donationCampaignModel from "../models/donationCampaignModel.js";
import donationHeroModel from "../models/donationHeroModel.js";

// ============= PUBLIC ROUTES =============

// GET all active campaigns
export const getActiveCampaignsController = async (req, res) => {
  try {
    const campaigns = await donationCampaignModel
      .find({ isActive: true })
      .sort({ order: 1 });

    res.status(200).send({
      success: true,
      campaigns,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching campaigns",
      error: error.message,
    });
  }
};

// GET all active hero slides
export const getActiveHeroSlidesController = async (req, res) => {
  try {
    const slides = await donationHeroModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .populate("campaignId", "title description type");

    res.status(200).send({
      success: true,
      slides,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching hero slides",
      error: error.message,
    });
  }
};

// GET single campaign by type
export const getCampaignByTypeController = async (req, res) => {
  try {
    const { type } = req.params;
    const campaign = await donationCampaignModel.findOne({
      type,
      isActive: true,
    });

    if (!campaign) {
      return res.status(404).send({
        success: false,
        message: "Campaign not found",
      });
    }

    res.status(200).send({
      success: true,
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching campaign",
      error: error.message,
    });
  }
};

// ============= ADMIN ROUTES =============

// GET all campaigns (admin)
export const getAllCampaignsController = async (req, res) => {
  try {
    const campaigns = await donationCampaignModel.find().sort({ order: 1 });
    res.status(200).send({
      success: true,
      campaigns,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching campaigns",
      error: error.message,
    });
  }
};

// ADD campaign
export const addCampaignController = async (req, res) => {
  try {
    const { title, description, type, buttonText, order, isActive } = req.body;

    let imageBase64 = "";
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    const campaign = new donationCampaignModel({
      title,
      description,
      image: imageBase64,
      type,
      buttonText: buttonText || "Donate Now",
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    await campaign.save();

    res.status(201).send({
      success: true,
      message: "Campaign added successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding campaign",
      error: error.message,
    });
  }
};

// UPDATE campaign
export const updateCampaignController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      buttonText,
      priceOptions,
      order,
      isActive,
    } = req.body;

    const updateData = {
      title,
      description,
      type,
      buttonText,
      order,
      isActive,
    };

    // Parse priceOptions if it's a string
    if (priceOptions) {
      updateData.priceOptions =
        typeof priceOptions === "string"
          ? JSON.parse(priceOptions)
          : priceOptions;
    }

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const campaign = await donationCampaignModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating campaign",
      error: error.message,
    });
  }
};

// DELETE campaign
export const deleteCampaignController = async (req, res) => {
  try {
    const { id } = req.params;
    await donationCampaignModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting campaign",
      error: error.message,
    });
  }
};

// ============= HERO SLIDES ADMIN =============

// GET all hero slides (admin)
export const getAllHeroSlidesController = async (req, res) => {
  try {
    const slides = await donationHeroModel
      .find()
      .sort({ order: 1 })
      .populate("campaignId");
    res.status(200).send({
      success: true,
      slides,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching hero slides",
      error: error.message,
    });
  }
};

// ADD hero slide
export const addHeroSlideController = async (req, res) => {
  try {
    const { title, subtitle, campaignId, buttonText, order, isActive } =
      req.body;

    let imageBase64 = "";
    if (req.file) {
      imageBase64 = req.file.buffer.toString("base64");
    }

    const slide = new donationHeroModel({
      title,
      subtitle: subtitle || "",
      image: imageBase64,
      campaignId,
      buttonText: buttonText || "Donate Now",
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    await slide.save();

    res.status(201).send({
      success: true,
      message: "Hero slide added successfully",
      slide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error adding hero slide",
      error: error.message,
    });
  }
};

// UPDATE hero slide
export const updateHeroSlideController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, campaignId, buttonText, order, isActive } =
      req.body;

    const updateData = {
      title,
      subtitle,
      campaignId,
      buttonText,
      order,
      isActive,
    };

    if (req.file) {
      updateData.image = req.file.buffer.toString("base64");
    }

    const slide = await donationHeroModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).send({
      success: true,
      message: "Hero slide updated successfully",
      slide,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating hero slide",
      error: error.message,
    });
  }
};

// DELETE hero slide
export const deleteHeroSlideController = async (req, res) => {
  try {
    const { id } = req.params;
    await donationHeroModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Hero slide deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting hero slide",
      error: error.message,
    });
  }
};
