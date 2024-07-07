import { Router } from "express";
import { upload } from "../db/multer.config.js";
import fs from "fs";
import { exec } from "child_process";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Thumbnail Route" });
});

router.post("/", upload.single("file"), (req, res) => {
  const thumbnailPath = req?.file?.path;
  try {
    const { fileId } = req.body;
    const thumbnailPath = req.file.path;
    if (!fileId) {
      fs.unlinkSync(thumbnailPath);
      return res.status(404).json({ message: "FileId or Time not found." });
    }

    const thumbnailOutputPath = `./uploads/thumbnails/${fileId}`;
    const thumbnailOutputPath1080_1920 = `${thumbnailOutputPath}/1080_1920.jpg`;

    if (!fs.existsSync(thumbnailOutputPath)) {
      fs.mkdirSync(thumbnailOutputPath, { recursive: true });
    }

    if (fs.existsSync(thumbnailOutputPath1080_1920)) {
      fs.unlinkSync(thumbnailOutputPath1080_1920);
    }

    const ffmpegCommandThumbnailExtract = `ffmpeg -i ${thumbnailPath} -vf crop='min(iw,ih)':'min(iw,ih)',scale=1080:1920 ${thumbnailOutputPath1080_1920}`;

    exec(ffmpegCommandThumbnailExtract, (err) => {
      if (err) {
        console.log(`exec error: ${err}`);
        res.json({ message: "error Occured during thumbnail processing." });
        return;
      }
      fs.unlinkSync(thumbnailPath);
      console.log("Thumbnail Uploaded Successfully");
      return res.json({
        message: "Thumbnail Uploaded Successfully",
        fileId
      });
    });
  } catch (error) {
    if (thumbnailPath) fs.unlinkSync(thumbnailPath);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message
    });
  }
});

export default router;
