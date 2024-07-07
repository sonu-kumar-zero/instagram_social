import { Router } from "express";
import profileRoute from "./profileRoute.js";
import postRoute from "./postRoute.js";
import reelRoute from "./reelRoute.js";
const router = Router();

router.use("/profile", profileRoute);
router.use("/post", postRoute);
router.use("/reel", reelRoute);

export default router;
