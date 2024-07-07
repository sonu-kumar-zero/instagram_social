import { Router } from "express";
// import { v4 as uuidv4 } from "uuid";
import { upload } from "../db/multer.config.js";
import fs from "fs";
import { exec } from "child_process";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Profile Route" });
});

router.post("/", upload.single("file"), (req, res) => {
  const { fileId } = req.body;
  console.log({ fileId });
  const profilePath = req.file.path;

  if (!fileId) {
    fs.unlinkSync(profilePath);
    return res.status(403).json({ message: "File Id Not Found" });
  }

  const outputPath = `./uploads/profile/${fileId}`;

  const outputPath100_100 = `./uploads/profile/${fileId}/100_100.jpg`;
  const outputPath300_300 = `./uploads/profile/${fileId}/300_300.jpg`;

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  if (fs.existsSync(outputPath100_100)) {
    fs.unlinkSync(outputPath100_100);
  }

  if (fs.existsSync(outputPath300_300)) {
    fs.unlinkSync(outputPath300_300);
  }

  // crop='min(iw,ih)':'min(iw,ih)',scale=100:100

  const ffmpegCommand100_100 = `ffmpeg -i ${profilePath} -vf crop='min(iw,ih)':'min(iw,ih)',scale=100:100 ${outputPath100_100}`;
  // const ffmpegCommand100_100 = `ffmpeg -i ${profilePath} -vf scale=100:100 ${outputPath100_100}`;

  const ffmpegCommand300_300 = `ffmpeg -i ${profilePath} -vf crop='min(iw,ih)':'min(iw,ih)',scale=300:300 ${outputPath300_300}`;
  // const ffmpegCommand300_300 = `ffmpeg -i ${profilePath} -vf scale=300:300 ${outputPath300_300}`;

  exec(ffmpegCommand100_100, (err, stdOut, stdErr) => {
    if (err) {
      console.log(`exec error: ${err}`);
      res.json({ message: "error Occured 100_100" });
      return;
    }
    console.log(`stdOut: ${stdOut}`);
    console.log(`stdErr: ${stdErr}`);

    exec(ffmpegCommand300_300, (err, stdOut, stdErr) => {
      if (err) {
        console.log(`exec error: ${err}`);
        res.json({ message: "error Occured 300_300" });
        return;
      }
      const imageId = fileId;
      fs.unlinkSync(profilePath);
      console.log("Image Uploaded Successfully");
      return res.json({ message: "Image Uploaded Successfully", imageId });
    });
  });
});

export default router;
