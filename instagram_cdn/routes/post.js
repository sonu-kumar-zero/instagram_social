import { Router } from "express";
import { upload } from "../db/multer.config.js";
import fs from "fs";
import { exec } from "child_process";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Post Route" });
});

router.post("/", upload.single("file"), (req, res) => {
  try {
    const { fileId } = req.body;
    console.log({ fileId });
    const postPath = req.file.path;
    console.log({ postPath });

    if (!fileId) {
      fs.unlinkSync(postPath);
      return res.status(403).json({ message: "File Id Not Found" });
    }

    const outputPath = `./uploads/posts/${fileId}`;
    const outputPath1080_1080 = `./uploads/posts/${fileId}/1080_1080.jpg`;

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    if (fs.existsSync(outputPath1080_1080)) {
      fs.unlinkSync(outputPath1080_1080);
    }

    const ffmpegCommand1080_1080 = `ffmpeg -i ${postPath} -vf scale=1080:1080 ${outputPath1080_1080}`;

    exec(ffmpegCommand1080_1080, (err, stdOut, stdErr) => {
      if (err) {
        console.log(`exec error: ${err}`);
        res.json({ message: "error Occured 1080_1080" });
        return;
      }
      // console.log(`stdOut: ${stdOut}`);
      // console.log(`stdErr: ${stdErr}`);
      const postId = fileId;
      fs.unlinkSync(postPath);
      return res.json({ message: "Post Image Uploaded Successfully", postId });
    });

  } catch (error) {
    res.json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
