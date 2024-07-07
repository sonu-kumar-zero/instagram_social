import { Router } from "express";
import { newImageAdd } from "../../controllers/upload.controller.js";

const router = Router();

router.post("/", newImageAdd);

export default router;
