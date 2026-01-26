import webMessageModel from "../models/webMessage.js";

////////////////////////
// CREATE WEB MESSAGE //
////////////////////////
export const createMessageController = async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    if (!name || !contact || !message) {
      return res.status(402).send({
        success: false,
        message: "All fields are required",
      });
    }
    const webmessage = new webMessageModel({ name, contact, message });
    await webmessage.save();
    res.status(200).send({
      success: true,
      message: "Message sent successfully",
      webmessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Web Message API",
      error,
    });
  }
};

////////////////////////
// GET ALL MESSAGES //
////////////////////////
export const getAllMessagesController = async (req, res) => {
  try {
    const webMessages = await webMessageModel.find({});

    if (!webMessages) {
      return res.status(404).send({
        success: false,
        message: "No messages found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All messages fetched successfully",
      totalCount: webMessages.length,
      webMessages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all messages",
      error,
    });
  }
};

///////////////////////////
// DELETE SINGLE MESSAGE //
///////////////////////////
export const deleteWebMessageController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Message id not found",
      });
    }
    const webMessage = await webMessageModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting message",
      error,
    });
  }
};
