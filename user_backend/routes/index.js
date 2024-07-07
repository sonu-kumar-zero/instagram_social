import { Router } from "express";
import userRoutes from "./userRoutes.js";
import uploadRoutesIndex from "./uploadRoutes/index.js";
import recommendationRoutes from "./recommendationRoute.js";

const router = Router();

router.use("/api/user", userRoutes);
router.use("/api/recommend", recommendationRoutes);
router.use("/api/upload", uploadRoutesIndex);

export default router;
