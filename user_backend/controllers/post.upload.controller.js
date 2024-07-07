import prisma from "../db/db.config.js";
import { v4 as uuidV4 } from "uuid";

// try {
// } catch (error) {
//   res.json({
//     message: "Internal Server Error Occured",
//     error: error.message
//   });
// }

const newPostUpload = async (req, res) => {
  try {
    const { numberOfPost, description, typeOfPost, typeOfMedia } = req.body;
    const { userId } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) return req.json({ message: "User Does not exisit" }).status(404);

    const newPostCreation = await prisma.post.create({
      data: {
        postUrlCount: Number.parseInt(numberOfPost),
        typeOfPost: typeOfPost,
        userId: userId,
        description: description
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        postsCount: {
          increment: 1
        }
      }
    });

    let ArrayOfUrl = [];
    for (let i = 0; i < Number.parseInt(numberOfPost); i++) {
      const url = uuidV4();
      ArrayOfUrl.push({ idx: i, url: url, type: typeOfMedia[i] });
      await prisma.postUrl.create({
        data: {
          index: i,
          type: typeOfMedia[i],
          url: url,
          postId: newPostCreation.id
        }
      });
    }

    return res
      .status(200)
      .json({ message: "Post Upload, Now upload the image", ArrayOfUrl });
  } catch (error) {
    res.json({
      message: "Internal Server Error Occured",
      error: error.message
    });
  }
};

const deleteUploadedPost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    if (!postId) {
      await prisma.post.deleteMany({
        where: {
          user: {
            id: userId
          }
        }
      });

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          postsCount: 0
        }
      });

      return res
        .status(200)
        .json({ message: "All Post Deleted Of Given UserId", userId });
    }

    await prisma.post.delete({
      where: {
        id: postId
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        postsCount: {
          decrement: 1
        }
      }
    });

    return res
      .status(200)
      .json({ message: "Post Deleted Of Given UserId", userId, postId });
  } catch (error) {
    res.json({
      message: "Internal Server Error Occured",
      error: error.message
    });
  }
};

const getAllPostOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const allPosts = await prisma.post.findMany({
      where: {
        user: {
          id: userId
        }
      },
      include: {
        postUrls: true,
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    res.json({ message: "All Posts Of Given User", allPosts });
  } catch (error) {
    res.json({
      message: "Internal Server Error Occured",
      error: error.message
    });
  }
};

export { newPostUpload, deleteUploadedPost, getAllPostOfUser };
