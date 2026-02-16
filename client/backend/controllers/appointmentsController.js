//////////////////////////////////////
/////////// BOOK APPOINTMENT /////////
//////////////////////////////////////

import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

export const bookAppointmentController = async (req, res) => {
  try {
    const { userId, doctorId, slotDate, slotTime, amount } = req.body;

    if (!userId || !doctorId || !slotDate || !slotTime || !amount) {
      return res.status(400).send({
        success: false,
        message: "Please add all the required fields",
      });
    }
    const appointment = new appointmentModel({
      userId,
      doctorId,
      slotDate,
      slotTime,
      amount,
    });

    await appointment.save();
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in booking appointment",
      error,
    });
  }
};

//////////////////////////////////////
///////// GET ALL APPOINTMENTS ////////
//////////////////////////////////////

export const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    if (!appointments) {
      return res.status(404).send({
        success: false,
        message: "No appointments found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All appointments fetched successfully",
      totalCount: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all appointments",
      error,
    });
  }
};

///////////////////////////////////////
/////// GET APPOINTMENT DETAILS ///////
///////////////////////////////////////

export const getAppointmentDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Appointment id not found",
      });
    }

    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Cannot find appointment with this id",
      });
    }
    // Find both the user and doctor
    const user = await userModel.findOne({ _id: appointment?.userId });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });

    res.status(200).send({
      success: true,
      message: "Appointment details fetched successfully",
      appointmentDetails: {
        clientName: user?.name,
        clientEmail: user?.email,
        clientPhone: user?.phone,
        doctorName: doctor?.name,
        doctorEmail: doctor?.email,
        doctorPhone: doctor?.phone,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting appointment details",
      error,
    });
  }
};

/////////////////////////////////////
///// UPDATE APPOINTMENT STATUS /////
/////////////////////////////////////

export const updateAppointmentStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Appointment id not found, Please add correct Appointment Id",
      });
    }

    const { appointmentStatus } = req.body;
    if (!appointmentStatus) {
      return res.status(404).send({
        success: false,
        message: "Please add appointment status",
      });
    }
    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { $set: { status: appointmentStatus.toLowerCase() } },
      //{ returnOriginal: false }
      { runValidators: true, new: true }
    );

    res.status(200).send({
      success: true,
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Appointment status",
      error,
    });
  }
};

/////////////////////////////////////
///// APPOINTMENT STATUS (USER) /////
/////////////////////////////////////

export const getUserAppointmentsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Appointment id not found",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Cannot find user with this id",
      });
    }
    const appointment = await appointmentModel.find({ userId: user?._id });
    res.status(200).send({
      success: true,
      message: "User appointments fetched successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user appointments",
      error,
    });
  }
};

//////////////////////////////////////////////
/////// GET APPOINTMENT DETAILS (USER) ///////
//////////////////////////////////////////////

export const getUserAppointmentDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Appointment id not found",
      });
    }

    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Cannot find appointment with this id",
      });
    }
    // Find both the user and doctor
    const user = await userModel.findOne({ _id: appointment?.userId });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });

    res.status(200).send({
      success: true,
      message: "Appointment details fetched successfully for a Normal user",
      appointmentDetails: {
        // clientName: user?.name,
        // clientEmail: user?.email,
        // clientPhone: user?.phone,
        doctorName: doctor?.name,
        doctorEmail: doctor?.email,
        doctorPhone: doctor?.phone,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting User SIDE appointment details",
      error,
    });
  }
};

///////////////////////////////////////
///// CANCEL BOOKING STATUS (USER)/////
///////////////////////////////////////

export const cancelAppointmentStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Appointment id not found, Please add correct Appointment Id",
      });
    }
    const appointment = await appointmentModel.findById(id);

    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "Cannot find appointment with this id",
      });
    }
    await appointment.updateOne({ $set: { status: "cancel" } });

    res.status(200).send({
      success: true,
      message: "Appointment has been canceled",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while canceling Appointment status",
      error,
    });
  }
};
