import { Router } from "express";
import { upload } from "../db/multer.config.js";
import fs from "fs";
import { exec } from "child_process";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "reels Route" });
});

router.post("/", upload.single("file"), (req, res) => {
  const reelPath = req?.file?.path;
  try {
    const { fileId, muted, startTime, endTime } = req.body;
    console.log({ fileId, muted, startTime, endTime });
    const reelPath = req.file.path;

    if (!fileId) {
      fs.unlinkSync(reelPath);
      return res.status(403).json({ message: "File Id Not Found" });
    }

    const videoOutputPath = `./uploads/reels/${fileId}`;

    const videoOutputHlsPath = `${videoOutputPath}/index.m3u8`;

    if (fs.existsSync(videoOutputPath)) {
      fs.unlinkSync(videoOutputPath);
    }

    if (!fs.existsSync(videoOutputPath)) {
      fs.mkdirSync(videoOutputPath, { recursive: true });
    }

    let ffmpegCommandVideoConversion = "";

    if (muted === "true") {
      ffmpegCommandVideoConversion = `ffmpeg -i ${reelPath} -ss ${Number.parseInt(
        startTime
      )} -to ${Number.parseInt(
        endTime
      )} -vf "scale=-1:1920, crop=1080:1920:(in_w-1080)/2:(in_h-1920)/2" -codec:v libx264 -an -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${videoOutputPath}/segment%03d.ts" -start_number 0 ${videoOutputHlsPath}`;
    } else {
      ffmpegCommandVideoConversion = `ffmpeg -i ${reelPath} -ss ${Number.parseInt(
        startTime
      )} -to ${Number.parseInt(
        endTime
      )} -vf "scale=-1:1920, crop=1080:1920:(in_w-1080)/2:(in_h-1920)/2" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${videoOutputPath}/segment%03d.ts" -start_number 0 ${videoOutputHlsPath}`;
    }

    // ffmpegCommandVideoConversion = `ffmpeg -i ${reelPath} -ss ${Number.parseInt(
    //   startTime
    // )} -to ${Number.parseInt(
    //   endTime
    // )} -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${videoOutputPath}/segment%03d.ts" -start_number 0 ${videoOutputHlsPath}`;

    if (ffmpegCommandVideoConversion === "") {
      fs.unlinkSync(reelPath);
      return res.status(404).json({ message: "FFmpegCommand is Missing." });
    }

    exec(ffmpegCommandVideoConversion, (err) => {
      if (err) {
        console.log(`exec error: ${err}`);
        res.json({ message: "error Occured during video processing." });
        return;
      }
      fs.unlinkSync(reelPath);
      console.log("Reel Uploaded Successfully");
      return res.json({
        message: "Reel Uploaded Successfully",
        fileId
      });
    });
  } catch (error) {
    if (reelPath) fs.unlinkSync(reelPath);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
