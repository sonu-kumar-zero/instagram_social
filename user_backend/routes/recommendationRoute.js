import { Router } from "express";
import {
  getRecentPostsAccordingToLimit,
  getRecentReelsAccordingToLimit
} from "../controllers/recommendation.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Reccomendation Route" });
});

// show all public post
router.get("/recentPosts", getRecentPostsAccordingToLimit);

router.get("/recentReels", getRecentReelsAccordingToLimit);

export default router;
