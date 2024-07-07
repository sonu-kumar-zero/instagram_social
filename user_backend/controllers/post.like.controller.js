import prisma from "../db/db.config.js";

const toggleLikeOnPost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const post = await prisma.post.findFirst({
      where: {
        id: postId
      }
    });
    if (!post)
      return res.status(404).json({
        message: "Post Not Found"
      });

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user)
      return res.status(404).json({
        message: "User Not Found"
      });

    const likeOnPost = await prisma.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId
      }
    });

    if (likeOnPost) {
      await prisma.postLike.delete({
        where: {
          id: likeOnPost.id
        }
      });

      await prisma.post.update({
        where: {
          id: postId
        },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      });
      return res.status(200).json({ message: "Like Removed Successfully" });
    }

    await prisma.postLike.create({
      data: {
        postId: postId,
        userId: userId
      }
    });
    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likesCount: {
          increment: 1
        }
      }
    });

    return res.status(200).json({ message: "Like Added Successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getLikeStatusOfPostByUserId = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const likedata = await prisma.postLike.findFirst({
      where: {
        postId: postId,
        userId: userId
      }
    });
    if (!likedata) {
      return res.status(200).json({ message: "Like Status", like: false });
    }
    return res.status(200).json({ message: "Like Status", like: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { toggleLikeOnPost, getLikeStatusOfPostByUserId };
