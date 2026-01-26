import express from "express";
import {
  bookAppointmentController,
  cancelAppointmentStatusController,
  getAllAppointmentsController,
  getAppointmentDetailsController,
  getUserAppointmentDetailsController,
  getUserAppointmentsController,
  updateAppointmentStatusController,
} from "../controllers/appointmentsController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// CREATE APPOINTMENT || POST
router.post("/create", userAuth, isAdmin, bookAppointmentController);

// GET ALL APPOINTMENTS || GET
router.get("/get-all", userAuth, isAdmin, getAllAppointmentsController);

// GET APPOINTMENT DETAILS || GET
router.get(
  "/get-details/:id",
  userAuth,
  isAdmin,
  getAppointmentDetailsController
);

// UPDATE APPOINTMENT STATUS || PATCH
router.patch(
  "/update-status/:id",
  userAuth,
  isAdmin,
  updateAppointmentStatusController
);

// GET USER APPOINTMENTS || GET
router.get(
  "/get-user-appointments/:id",
  userAuth,
  getUserAppointmentsController
);

// GET APPOINTMENT DETAILS (USER SIDE) || GET
router.get(
  "/get-user-appointments-details/:id",
  userAuth,
  getUserAppointmentDetailsController
);

// CANCEL APPOINTMENT STATUS (USER) || PATCH
router.post("/cancel/:id", userAuth, cancelAppointmentStatusController);

export default router;
