import prisma from "../db/db.config.js";

const addCommentOnReel = async (req, res) => {
  try {
    const { userId, reelId } = req.params;
    const { commentString, parentReelCommentId } = req.body;

    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User Not Found." });

    const reelData = await prisma.postUrl.findFirst({ where: { id: reelId } });
    if (!reelData) return res.status(404).json({ message: "Reel Not Found." });

    await prisma.reelComment.create({
      data: {
        commentText: commentString,
        reelId: reelId,
        userId: userId,
        parentReelCommentId: parentReelCommentId
      }
    });

    if (parentReelCommentId) {
      await prisma.reelComment.update({
        where: {
          id: parentReelCommentId
        },
        data: {
          commentCount: {
            increment: 1
          }
        }
      });
      return res.status(200).json({ message: "Added A new comment On Reel." });
    }

    await prisma.postUrl.update({
      where: {
        id: reelId
      },
      data: {
        commentCount: {
          increment: 1
        }
      }
    });

    return res.status(200).json({ message: "Added A new comment On Reel." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getCommentsOfReel = async (req, res) => {
  try {
    const { reelId } = req.params;
    const comments = await prisma.reelComment.findMany({
      where: {
        reelId: reelId,
        parentReelCommentId: null
      },
      include: {
        user: true
      }
    });
    return res
      .status(200)
      .json({ message: "All Comment Of Given reelId", comments: comments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error.", error: error.message });
  }
};

const getCommentsOfReelGivenParentCommentId = async (req, res) => {
  try {
    const { parentCommentId } = req.params;
    const comments = await prisma.reelComment.findMany({
      where: {
        parentReelCommentId: parentCommentId
      },
      include: {
        user: true
      }
    });
    return res.status(200).json({
      message: "All Replies Of Given Comment Id.",
      comments: comments
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteCommentOnReel = async (req, res) => {
  try {
    const { reelId, userId } = req.params;
    const { commentId, parentCommentId } = req.body;

    const commentData = await prisma.reelComment.findFirst({
      where: {
        id: commentId
      },
      include: {
        reel: {
          include: {
            post: true
          }
        }
      }
    });

    if (!commentData)
      return res.status(404).json({ message: "Comment Not Found." });

    if (
      parentCommentId === null &&
      (commentData.userId === userId || commentData.reel.post.userId === userId)
    ) {
      await prisma.reelComment.delete({ where: { id: commentData.id } });

      await prisma.postUrl.update({
        where: {
          id: commentData.reelId
        },
        data: {
          commentCount: {
            decrement: 1
          }
        }
      });

      return res.status(200).json({ message: "Comment Deleted Successfully" });
    } else if (
      parentCommentId &&
      (commentData.userId === userId || commentData.reel.post.userId === userId)
    ) {
      await prisma.reelComment.delete({ where: { id: commentData.id } });

      await prisma.reelComment.update({
        where: {
          id: parentCommentId
        },
        data: {
          commentCount: {
            decrement: 1
          }
        }
      });

      return res.status(200).json({ message: "Comment Deleted Successfully" });
    }
    return res.status(405).json({ message: "Illegal Access" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const toggleLikeOnReelComment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const comment = await prisma.reelComment.findFirst({
      where: { id: commentId }
    });

    if (!comment) return res.status(404).json({ message: "Comment Not Found" });

    const commentLike = await prisma.reelCommentLike.findFirst({
      where: {
        userId: userId,
        reelCommentId: commentId
      }
    });

    if (commentLike) {
      await prisma.reelCommentLike.delete({
        where: { id: commentLike.id }
      });
      await prisma.reelComment.update({
        where: {
          id: commentId
        },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      });
      return res.status(200).json({ message: "Like Removed Successfully" });
    }

    await prisma.reelCommentLike.create({
      data: {
        userId: userId,
        reelCommentId: commentId
      }
    });

    await prisma.reelComment.update({
      where: {
        id: commentId
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
      .json({ message: "Internal Server Error.", error: error });
  }
};

const getLikeStatusOfLikeOnReelComment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const likeData = await prisma.reelCommentLike.findFirst({
      where: {
        userId: userId,
        reelCommentId: commentId
      }
    });
    if (!likeData)
      return res.status(200).json({ message: "Like Status", like: false });

    return res.status(200).json({ message: "Like Status", like: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

export {
  addCommentOnReel,
  getCommentsOfReel,
  deleteCommentOnReel,
  getCommentsOfReelGivenParentCommentId,
  toggleLikeOnReelComment,
  getLikeStatusOfLikeOnReelComment
};
