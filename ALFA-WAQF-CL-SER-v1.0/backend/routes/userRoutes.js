import express from "express";
import {
  getAllUsersController,
  getStatsController,
  getUserDetailsController,
  passwordResetController,
  updateUserController,
  userLoginController,
  userRegisterController,
} from "../controllers/userController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.js";

const router = express();

// REGISTER USER || POST
router.post("/register", userRegisterController);

// LOGIN USER || POST
router.post("/login", userLoginController);

// GET ALL USERS || GET
router.get("/get-all", userAuth, isAdmin, getAllUsersController);

// GET USER DETAILS || GET
router.get("/get-user/:id", userAuth, isAdmin, getUserDetailsController);

// UPDATE USER PROFILE || PATCH
router.patch(
  "/update/:id",
  userAuth,
  upload.single("image"),
  updateUserController
);

// RESET USER PASSWORD || patch
router.patch("/reset-password/:id", userAuth, passwordResetController);

// STATISTICS || GET
router.get("/get-stats", userAuth, isAdmin, getStatsController);

export default router;
