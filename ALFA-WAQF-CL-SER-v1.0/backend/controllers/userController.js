import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentsModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";

///////////////////
// REGISTER USER //
///////////////////

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation check -- NAME, EMAIL AND PASSWORD
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Name, email and password is required",
      });
    }
    // Password hashing -- BCRYPT ALGORITHM || 10 rounds
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    // save user data
    const newUser = new userModel(userData);
    const user = await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering",
      error,
    });
  }
};

////////////////
// LOGIN USER //
////////////////
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation check -- NAME AND PASSWORD
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password fields are required",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Password matching
    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Token generation
    const token = JWT.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "25d",
    });
    user.password = undefined; // Remove password from response
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while login",
      error,
    });
  }
};

/////////////////////////
// Update User Details //
/////////////////////////

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "User id not found",
      });
    }
    const { name, phone, dob, gender, address } = req.body;
    // Future todo: allow users to update email address

    const photoToBase64 = req.file && req.file.buffer.toString("base64");
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { name, dob, phone, gender, address, image: photoToBase64 },
      },
      {
        returnOriginal: false, // or should we use { new: true }
      }
    );

    res.status(200).send({
      success: true,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating user",
      error,
    });
  }
};
////////////////////
// PASSWORD RESET //
////////////////////

export const passwordResetController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "User id not found",
      });
    }
    const { oldPassword, newPassword, confirmPassword } = req.body;
    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords do not match",
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(402).send({
        success: false,
        message: "User not found",
      });
    }

    // VERIFY OLD PASSWORD
    const isMatch = await bcrypt.compare(oldPassword, user?.password);

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Your old password is incorrect",
      });
    }

    // Prevent reusing same password
    const samePassword = await bcrypt.compare(newPassword, user.password);
    if (samePassword) {
      return res.status(400).send({
        success: false,
        message: "New password must be different from old password",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while resetting password",
      error,
    });
  }
};

/////////////////////////////////
///////// GET ALL USERS//////////
/////////////////////////////////

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});

    if (!users) {
      return res.status(404).send({
        success: false,
        message: "No users found",
        users,
      });
    }

    res.status(200).send({
      success: true,
      message: "All users fetched successfully",
      totalCount: users.length,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting all users",
      error,
    });
  }
};

// GET USER AND APPOINTMENT DETAILS

export const getUserDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please add a user id",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with this ID",
      });
    }
    // Find appointments of a user
    const appointments = await appointmentModel.find({ userId: user?._id });
    res.status(200).send({
      success: true,
      message: "User details fetched successfully",
      user,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting user details",
      error,
    });
  }
};

export const getStatsController = async (req, res) => {
  try {
    const users = await userModel.find({});
    const doctors = await doctorModel.find({});
    const appointments = await appointmentModel.aggregate([
      {
        $group: {
          _id: null,
          totalEarning: { $sum: { $toDouble: "$amount" } },
          // $sum operator requires numbers and our value is string, so we need to convert it
        },
      },
    ]);
    const total = appointments.length > 0 ? appointments[0].totalEarning : 0;

    res.status(200).send({
      success: true,
      message: "All Stats fetched successfully",
      stats: {
        totalUsers: users.length,
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        earnings: total,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while getting stats",
      error,
    });
  }
};
