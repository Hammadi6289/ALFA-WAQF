import express from "express";
import multer from "multer";
import {
  getActiveCampaignsController,
  getActiveHeroSlidesController,
  getCampaignByTypeController,
  getAllCampaignsController,
  addCampaignController,
  updateCampaignController,
  deleteCampaignController,
  getAllHeroSlidesController,
  addHeroSlideController,
  updateHeroSlideController,
  deleteHeroSlideController,
} from "../controllers/donationController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import {
  createDonationSession,
  getDonationSession,
  updateDonationSession,
} from "../controllers/donationSessionController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ============= PUBLIC ROUTES =============
router.get("/campaigns/active", getActiveCampaignsController);
router.get("/campaigns/type/:type", getCampaignByTypeController);
router.get("/hero-slides/active", getActiveHeroSlidesController);

// ============= ADMIN ROUTES =============
// Campaigns
router.get("/admin/campaigns", userAuth, isAdmin, getAllCampaignsController);
router.post(
  "/admin/campaigns/add",
  userAuth,
  isAdmin,
  upload.single("image"),
  addCampaignController
);
router.patch(
  "/admin/campaigns/update/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateCampaignController
);
router.delete(
  "/admin/campaigns/delete/:id",
  userAuth,
  isAdmin,
  deleteCampaignController
);

// Hero Slides
router.get("/admin/hero-slides", userAuth, isAdmin, getAllHeroSlidesController);
router.post(
  "/admin/hero-slides/add",
  userAuth,
  isAdmin,
  upload.single("image"),
  addHeroSlideController
);
router.patch(
  "/admin/hero-slides/update/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateHeroSlideController
);
router.delete(
  "/admin/hero-slides/delete/:id",
  userAuth,
  isAdmin,
  deleteHeroSlideController
);

// Donation Session routes (public)
router.post("/session/create", createDonationSession);
router.get("/session/:sessionId", getDonationSession);
router.patch("/session/:sessionId", updateDonationSession);

export default router;
