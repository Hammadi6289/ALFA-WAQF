import express from "express";
import multer from "multer";
import {
  getActiveBlocksController,
  getBlocksByTypeController,
  getBlockByIdController,
  getAllBlocksController,
  addBlockController,
  updateBlockController,
  deleteBlockController,
  reorderBlocksController,
} from "../controllers/contentBlockController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ============= PUBLIC ROUTES =============
router.get("/active", getActiveBlocksController);
router.get("/type/:type", getBlocksByTypeController);
router.get("/:id", getBlockByIdController);

// ============= ADMIN ROUTES =============
router.get("/admin/all", userAuth, isAdmin, getAllBlocksController);
router.post(
  "/admin/add",
  userAuth,
  isAdmin,
  upload.single("image"),
  addBlockController
);
router.patch(
  "/admin/update/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateBlockController
);
router.delete("/admin/delete/:id", userAuth, isAdmin, deleteBlockController);
router.post("/admin/reorder", userAuth, isAdmin, reorderBlocksController);

export default router;
