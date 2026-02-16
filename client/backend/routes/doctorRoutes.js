import express from "express";
import {
  addDoctorController,
  deleteDoctorController,
  getAllDoctorsController,
  getDoctorDetailsController,
  updateAvailabilityStatusController,
  updateDoctorController,
} from "../controllers/doctorController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// ADD NEW DOCTOR || POST
router.post(
  "/add",
  userAuth,
  isAdmin,
  upload.single("image"),
  addDoctorController
);

// GET ALL DOCTORS || GET
router.get("/get-all", getAllDoctorsController);

// GET DOCTOR DETAILS || GET
router.get("/get-details/:id", getDoctorDetailsController);

// UPDATE DOCTOR || PATCH
router.patch(
  "/update/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateDoctorController
);

// DELETE DOCTOR || DELETE
router.delete("/delete/:id", userAuth, isAdmin, deleteDoctorController);

// UPDATE AVAILABILITY STATUS || PATCH
router.patch(
  "/update-status/:id",
  userAuth,
  isAdmin,
  updateAvailabilityStatusController
);

export default router;
