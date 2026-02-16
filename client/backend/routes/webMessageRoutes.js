import express from "express";
import {
  createMessageController,
  deleteWebMessageController,
  getAllMessagesController,
} from "../controllers/webMessageController.js";
import { userAuth, isAdmin } from "../middlewares/authMiddlewares.js";
const router = express.Router();

// CREATE MESSAGE || POST
router.post("/create", createMessageController);

// GET ALL MESSAGES || GET
router.get("/get-all", getAllMessagesController);

// DELETE MESSAGE || DELETE
// TODO: THIS NEEDS A THOUROGH TESTING COVERING DIFFERENT SCENARIOS
router.delete("/delete/:id", userAuth, isAdmin, deleteWebMessageController);

export default router;
