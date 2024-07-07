import prisma from "../db/db.config.js";

const writeCommentOnGivenPostId = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { commentText, parentCommentId } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) return res.status(404).json({ message: "User Does't Exist." });

    const post = await prisma.post.findFirst({
      where: {
        id: postId
      }
    });

    if (!post) return res.status(404).json({ message: "Post Does't Exist." });

    await prisma.comment.create({
      data: {
        userId: userId,
        postId: postId,
        commentText: commentText,
        parentCommentId: parentCommentId
      }
    });

    if (parentCommentId) {
      await prisma.comment.update({
        where: {
          id: parentCommentId
        },
        data: {
          commentCount: {
            increment: 1
          }
        }
      });

      return res.status(200).json({ message: "Comment Added to comment." });
    }

    await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        commentCount: {
          increment: 1
        }
      }
    });

    return res.status(200).json({ message: "Comment Added Successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllCommentsOfGivenPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const allCommentsOfGivenPostId = await prisma.comment.findMany({
      where: {
        postId: postId,
        parentCommentId: null
      },
      include: {
        user: {
          include: true
        }
      }
    });
    return res.json({
      message: "All Comments Of Given PostId",
      comments: allCommentsOfGivenPostId
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllCommentsOfGivenParentCommentId = async (req, res) => {
  try {
    const { parentCommentId } = req.params;
    const allComments = await prisma.comment.findMany({
      where: {
        parentCommentId: parentCommentId
      },
      include: {
        user: {
          include: true
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return res.json({
      message: "All comments of given parentcommentId",
      comment: allComments
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { userId, postId, commentId } = req.params;
    const { parentCommentId } = req.body;
    if (!commentId || !userId || !postId)
      return res.status(404).json({ message: "Id's are missing" });
    // userId => commentWrittenUser or PostUploadedUser
    // for comment deletion
    const commentData = await prisma.comment.findFirst({
      where: {
        id: commentId
      },
      include: {
        post: {
          include: true
        }
      }
    });

    if (!commentData)
      return res.status(404).json({ message: "Comment Not Found" });

    if (
      parentCommentId === null &&
      (commentData.userId === userId || commentData.post.userId === userId)
    ) {
      await prisma.comment.delete({
        where: {
          id: commentId
        }
      });
      await prisma.post.update({
        where: {
          id: commentData.post.id
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
      (commentData.userId === userId || commentData.post.userId === userId)
    ) {
      await prisma.comment.delete({
        where: {
          id: commentId
        }
      });
      await prisma.comment.update({
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
    } else {
      return res.status(405).json({ message: "Illegal Access" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const toggleLikeOnComment = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) return res.status(404).json({ message: "User not found." });
    const comment = await prisma.comment.findFirst({
      where: {
        id: commentId
      }
    });
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });
    const commentLike = await prisma.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: commentId
      }
    });

    if (commentLike) {
      await prisma.commentLike.delete({
        where: {
          id: commentLike.id
        }
      });
      await prisma.comment.update({
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

    await prisma.commentLike.create({
      data: {
        commentId: commentId,
        userId: userId
      }
    });

    await prisma.comment.update({
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
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getLikeStatusOnCommentByUserIdAndCommentId = async (req, res) => {
  try {
    const { userId, commentId } = req.params;

    const likedata = await prisma.commentLike.findFirst({
      where: {
        commentId: commentId,
        userId: userId
      }
    });

    if (!likedata) {
      return res.status(200).json({ message: "Like Status", like: false });
    };
    return res.status(200).json({ message: "Like Status", like: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  writeCommentOnGivenPostId,
  getAllCommentsOfGivenPostId,
  getAllCommentsOfGivenParentCommentId,
  deleteComment,
  toggleLikeOnComment,
  getLikeStatusOnCommentByUserIdAndCommentId
};
