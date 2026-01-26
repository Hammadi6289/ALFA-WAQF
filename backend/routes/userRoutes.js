import express from "express";
import {
  passwordResetController,
  updateUserController,
  userLoginController,
  userRegisterController,
} from "../controllers/userController.js";
import { userAuth } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/multer.js";

const router = express();

// REGISTER USER || POST
router.post("/register", userRegisterController);

// LOGIN USER || POST
router.post("/login", userLoginController);

// UPDATE USER PROFILE || PATCH
router.patch(
  "/update/:id",
  userAuth,
  upload.single("image"),
  updateUserController
);

// RESET USER PASSWORD || patch
router.patch("/reset-password/:id", userAuth, passwordResetController);

export default router;
