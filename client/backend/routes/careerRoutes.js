import express from "express";
import {
  getAllCareersController,
  getCareerDetailsController,
  addCareerController,
  updateCareerController,
  deleteCareerController,
  submitApplicationController,
  getAllApplicationsController,
  updateApplicationStatusController,
} from "../controllers/careerController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// Public routes
router.get("/get-all", getAllCareersController);
router.get("/get-details/:id", getCareerDetailsController);
router.post("/apply", submitApplicationController);

// Admin only routes
router.post("/add", userAuth, isAdmin, addCareerController);
router.patch("/update/:id", userAuth, isAdmin, updateCareerController);
router.delete("/delete/:id", userAuth, isAdmin, deleteCareerController);
router.get("/applications", userAuth, isAdmin, getAllApplicationsController);
router.put(
  "/application-status/:id",
  userAuth,
  isAdmin,
  updateApplicationStatusController
);

export default router;
