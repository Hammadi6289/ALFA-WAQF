import careerModel from "../models/careerModel.js";
import jobApplicationModel from "../models/jobApplicationModel.js";

// GET all careers (public - active only)
export const getAllCareersController = async (req, res) => {
  try {
    const careers = await careerModel
      .find({ isActive: true })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      careers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching careers",
      error,
    });
  }
};

// GET single career (public)
export const getCareerDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await careerModel.findById(id);

    if (!career) {
      return res.status(404).send({
        success: false,
        message: "Career not found",
      });
    }

    res.status(200).send({
      success: true,
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching career details",
      error,
    });
  }
};

// ADD new career (admin only)
// backend/controllers/careerController.js
export const addCareerController = async (req, res) => {
  try {
    const { title, aboutUs, theRole, whatYoullDo, whatYoullBring, location } =
      req.body;

    console.log("Received data:", {
      title,
      aboutUs,
      theRole,
      whatYoullDo,
      whatYoullBring,
      location,
    });

    // No JSON parsing needed! Just use the values directly
    const career = new careerModel({
      title,
      aboutUs,
      theRole,
      whatYoullDo,
      whatYoullBring,
      location,
    });

    await career.save();

    res.status(201).send({
      success: true,
      message: "Career added successfully",
      career,
    });
  } catch (error) {
    console.log("Error adding career:", error);
    res.status(500).send({
      success: false,
      message: "Error adding career",
      error: error.message,
    });
  }
};

// UPDATE career (admin only)
export const updateCareerController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      aboutUs,
      theRole,
      whatYoullDo,
      whatYoullBring,
      location,
      isActive,
    } = req.body;

    const updateData = {
      title,
      aboutUs,
      theRole,
      whatYoullDo,
      whatYoullBring,
      location,
      isActive,
    };

    const career = await careerModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!career) {
      return res.status(404).send({
        success: false,
        message: "Career not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Career updated successfully",
      career,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating career",
      error,
    });
  }
};

// DELETE career (admin only)
export const deleteCareerController = async (req, res) => {
  try {
    const { id } = req.params;
    await careerModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting career",
      error,
    });
  }
};

// ============= JOB APPLICATION =============

// Submit job application (public)
export const submitApplicationController = async (req, res) => {
  try {
    const { jobId, jobTitle, name, email, phone, resume } = req.body;

    // Validate required fields
    if (!jobId || !jobTitle || !name || !email || !phone) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const application = new jobApplicationModel({
      jobId,
      jobTitle,
      name,
      email,
      phone,
      resume: resume || "",
    });

    await application.save();

    res.status(201).send({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error submitting application",
      error,
    });
  }
};

// GET all applications (admin only)
export const getAllApplicationsController = async (req, res) => {
  try {
    const applications = await jobApplicationModel
      .find()
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching applications",
      error,
    });
  }
};

// UPDATE application status (admin only)
export const updateApplicationStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await jobApplicationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Application status updated",
      application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating application status",
      error,
    });
  }
};
