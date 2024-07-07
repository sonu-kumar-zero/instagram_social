import { Router } from "express";
import reelRoute from "./reels.js";
import profileRoute from "./profile.js";
import postRoute from "./post.js";
import thumbnailRoute from "./thumbnails.js";
const router = Router();

router.use("/reel", reelRoute);
router.use("/post", postRoute);
router.use("/profile", profileRoute);
router.use("/thumbnail", thumbnailRoute);

export default router;
