import { Router } from "express";

import {
  getStatusOfLikeOnReel,
  toggleLikeOnReel
} from "../../controllers/reel.like.controller.js";

import {
  addCommentOnReel,
  deleteCommentOnReel,
  getCommentsOfReel,
  getCommentsOfReelGivenParentCommentId,
  getLikeStatusOfLikeOnReelComment,
  toggleLikeOnReelComment
} from "../../controllers/reel.comment.controller.js";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Reel Route Upload Handler" });
});

router.get(
  "/comment/reel/like/:userId/:commentId",
  getLikeStatusOfLikeOnReelComment
);
router.post("/comment/reel/like/:userId/:commentId", toggleLikeOnReelComment);

router.get(
  "/comment/reel/replie/:userId/:reelId/:parentCommentId",
  getCommentsOfReelGivenParentCommentId
);

router.get("/comment/reel/:userId/:reelId/", getCommentsOfReel);
router.post("/comment/reel/:userId/:reelId", addCommentOnReel);
router.delete("/comment/reel/:userId/:reelId", deleteCommentOnReel);

router.get("/like/reel/:userId/:reelId", getStatusOfLikeOnReel);
router.post("/like/reel/:userId/:reelId", toggleLikeOnReel);

export default router;
