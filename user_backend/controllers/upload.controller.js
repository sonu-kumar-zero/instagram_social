import prisma from "../db/db.config.js";
import { v4 as uuidv4 } from "uuid";

const newImageAdd = async (req, res) => {
  try {
    const profileImageid = uuidv4();
    const { userId } = req.body;
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        imageUrl: profileImageid
      }
    });

    res.json({
      message: "Successfully Added New Image Url ",
      imageUrl: profileImageid
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export { newImageAdd };
