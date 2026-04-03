import express from "express";
import multer from "multer";
import {
  getAllNewsController,
  getNewsBySlugController,
  getLatestNewsController,
  getAllNewsAdminController,
  addNewsController,
  updateNewsController,
  deleteNewsController,
} from "../controllers/newsController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ============= PUBLIC ROUTES =============
router.get("/", getAllNewsController);
router.get("/latest", getLatestNewsController);
router.get("/:slug", getNewsBySlugController);

// ============= ADMIN ROUTES =============
router.get("/admin/all", userAuth, isAdmin, getAllNewsAdminController);
router.post(
  "/admin/add",
  userAuth,
  isAdmin,
  upload.single("image"),
  addNewsController
);
router.patch(
  "/admin/update/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateNewsController
);
router.delete("/admin/delete/:id", userAuth, isAdmin, deleteNewsController);

export default router;
