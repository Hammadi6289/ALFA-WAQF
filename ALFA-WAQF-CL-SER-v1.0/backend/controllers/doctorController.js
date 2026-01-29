import doctorModel from "../models/doctorModel.js";

/////////////////////////////////
/////////// ADD DOCTOR //////////
/////////////////////////////////
export const addDoctorController = async (req, res) => {
  try {
    const {
      name,
      email,
      about,
      image,
      speciality,
      degree,
      experience,
      fees,
      phone,
      address,
      gender,
    } = req.body;

    if (
      !name ||
      !email ||
      !about ||
      !image ||
      !speciality ||
      !degree ||
      !experience ||
      !fees ||
      !phone ||
      !address ||
      !gender
    )
      return res
        .status(500)
        .send({ success: false, message: "All fields are required" });

    const photoBase64 = req.file && req.file.buffer.toString("base64");

    const doctorData = {
      name,
      email,
      about,
      image: photoBase64,
      speciality,
      degree,
      experience,
      fees,
      phone,
      address,
      gender,
    };
    const doctor = new doctorModel(doctorData);

    await doctor.save();
    res
      .status(201)
      .send({ success: true, message: "Doctor added successfully", doctor });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in adding doctor", error });
  }
};

/////////////////////////////////
/////// GET ALL DOCTORS /////////
/////////////////////////////////
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});

    if (!doctors) {
      return res
        .status(404)
        .send({ success: false, message: "No doctors found" });
    }

    res.status(200).send({
      success: true,
      message: "All doctors fetched successfully",
      totalCount: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting all doctors", error });
  }
};

/////////////////////////////////
//////// GET SINGLE DOCTOR///////
/////////////////////////////////
export const getDoctorDetailsController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Doctor id not found, Please add correct doc Id",
      });
    }
    const doctor = await doctorModel.findById(id);

    if (!doctor) {
      return res
        .status(404)
        .send({ success: false, message: "Cannot find doctor with this id" });
    }

    res.status(200).send({
      success: true,
      message: "Doctor details fetched successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting doctor details",
      error,
    });
  }
};

/////////////////////////////////
///////// UPDATE DOCTOR /////////
/////////////////////////////////

export const updateDoctorController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Doctor id not found, Please add correct doc Id",
      });
    }
    const data = req.body;
    const photoBase64 = req.file && req.file.buffer.toString("base64");
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        returnOriginal: false,
      }
    );

    res.status(200).send({
      success: true,
      message: "Doctor details updated successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating doctor details",
      error,
    });
  }
};

/////////////////////////////////
//////// DELETE DOCTOR //////////
/////////////////////////////////

export const deleteDoctorController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Doctor id not found, Please add correct doc Id to delete",
      });
    }
    const doctor = await doctorModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Doctor details deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting doctor API",
      error,
    });
  }
};

/////////////////////////////////
///// UPDATE AVAILABLE STATUS ///
/////////////////////////////////

export const updateAvailabilityStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Doctor id not found, Please add correct doc Id",
      });
    }

    const { availableStatus } = req.body;
    if (!availableStatus) {
      return res.status(404).send({
        success: false,
        message: "Please add availability status",
      });
    }
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: { available: availableStatus } },
      { returnOriginal: false }
    );

    res.status(200).send({
      success: true,
      message: "Availability status updated successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating availability status",
      error,
    });
  }
};
