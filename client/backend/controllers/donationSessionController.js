import donationSessionModel from "../models/donationSessionModel.js";
import { v4 as uuidv4 } from "uuid";

// CREATE donation session
export const createDonationSession = async (req, res) => {
  try {
    const {
      campaignId,
      amount,
      donorTitle,
      donorName,
      donorEmail,
      donorPhone,
      donorAddress,
    } = req.body;

    const sessionId = uuidv4();

    const session = new donationSessionModel({
      campaignId,
      amount,
      donorTitle: donorTitle || "",
      donorName,
      donorEmail,
      donorPhone,
      donorAddress: donorAddress || "",
      sessionId,
    });

    await session.save();

    res.status(201).send({
      success: true,
      sessionId,
      session,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating donation session",
      error: error.message,
    });
  }
};

// GET donation session by ID
export const getDonationSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await donationSessionModel
      .findOne({ sessionId })
      .populate("campaignId");

    if (!session) {
      return res.status(404).send({
        success: false,
        message: "Donation session not found",
      });
    }

    if (session.status !== "pending") {
      return res.status(400).send({
        success: false,
        message: `Donation session is already ${session.status}`,
      });
    }

    if (session.expiresAt < new Date()) {
      session.status = "expired";
      await session.save();
      return res.status(400).send({
        success: false,
        message: "Donation session has expired",
      });
    }

    res.status(200).send({
      success: true,
      session,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching donation session",
      error: error.message,
    });
  }
};

// UPDATE donation session (for payment processing)
export const updateDonationSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { status } = req.body;

    const session = await donationSessionModel.findOneAndUpdate(
      { sessionId },
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      session,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating donation session",
      error: error.message,
    });
  }
};
