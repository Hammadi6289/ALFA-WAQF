import express from "express";
import {
  deactivateAccountController,
  deleteUserController,
  getAllUsersController,
  getLoginUserController,
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

// DELETE USER || DELETE
router.delete("/delete-user/:id", userAuth, isAdmin, deleteUserController);

// RESET USER PASSWORD || patch
router.patch("/reset-password/:id", userAuth, passwordResetController);

// DELETE SELF ACCOUNT || DELETE
router.delete("/delete-account/:id", userAuth, deactivateAccountController);

// STATISTICS || GET
router.get("/get-stats", userAuth, isAdmin, getStatsController);

// GET LOGGED IN USER || GET
router.get("/get-login-user/:id", userAuth, getLoginUserController);

export default router;
