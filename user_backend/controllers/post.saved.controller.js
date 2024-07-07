import prisma from "../db/db.config.js";

const toggleSavedPostInCollection = async (req, res) => {
  try {
    const { userId, postId, collectionId } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const post = await prisma.post.findFirst({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post Not Found" });

    const collection = await prisma.userSaved.findFirst({
      where: { id: collectionId }
    });
    if (!collection)
      return res.status(404).json({ message: "Collection Not Found" });

    const userSavedPostData = await prisma.userSavedPost.findFirst({
      where: {
        postId: post.id,
        userSaved: {
          user: {
            id: userId
          }
        }
        // userSavedId: collection.id
      }
    });

    if (!userSavedPostData) {
      await prisma.userSavedPost.create({
        data: {
          postId: post.id,
          userSavedId: collection.id
        }
      });

      return res.status(200).json({ message: "Added to Collection." });
    }

    await prisma.userSavedPost.delete({ where: { id: userSavedPostData.id } });
    return res.status(200).json({ message: "Removed from Collection." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", message: error.message });
  }
};

const statusOfPostPresentInCollection = async (req, res) => {
  try {
    const { userId, postId, collectionId } = req.params;
    const userSavedPostInCollectionStatus =
      await prisma.userSavedPost.findFirst({
        where: {
          postId: postId,
          userSaved: {
            user: {
              id: userId
            }
          }
          // userSavedId: collectionId
        }
      });
    if (userSavedPostInCollectionStatus) {
      return res
        .status(200)
        .json({ message: "Part Of Collection", saved: true });
    }
    return res
      .status(200)
      .json({ message: "Not A Part Of Collection", saved: false });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", message: error.message });
  }
};

const getAllSavedPostOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const allSavedPosts = await prisma.userSaved.findMany({
      where: {
        userId: userId
      },
      include: {
        posts: {
          include: {
            post: {
              include: {
                user: {
                  include: true
                },
                postUrls: {
                  include: true
                }
              }
            }
          }
        }
      }
    });

    return res
      .status(200)
      .json({ message: "All Saved Posts By User", posts: allSavedPosts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const createNewCollectionOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { collectionName } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });
    if (!user) return res.status(404).json({ message: "User Not Found." });

    const collectionData = await prisma.userSaved.findFirst({
      where: {
        userId: userId,
        givenName: collectionName
      }
    });
    if (collectionData)
      return res.status(200).json({
        message: `${collectionName} Name Collection is Already exist.`
      });

    await prisma.userSaved.create({
      data: {
        givenName: collectionName,
        userId: userId
      }
    });
    return res
      .status(200)
      .json({ message: `New Collection Created With ${collectionName} name.` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

const getAllCollectionNameOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const allCollections = await prisma.userSaved.findMany({
      where: {
        user: {
          id: userId
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return res.status(200).json({
      message: "All Collection Of Given User",
      collection: allCollections
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  toggleSavedPostInCollection,
  statusOfPostPresentInCollection,
  getAllSavedPostOfUser,
  createNewCollectionOfUser,
  getAllCollectionNameOfUser
};
