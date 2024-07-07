import prisma from "../db/db.config.js";

const toggleLikeOnReel = async (req, res) => {
  try {
    const { userId, reelId } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: userId }
    });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const reel = await prisma.postUrl.findFirst({
      where: {
        id: reelId
      }
    });
    if (!reel) return res.status(404).json({ message: "Reel Not Found" });

    const likeData = await prisma.reelLike.findFirst({
      where: {
        userId: userId,
        reelId: reelId
      }
    });
    console.log(likeData);
    if (likeData) {
      await prisma.reelLike.delete({ where: { id: likeData.id } });
      await prisma.postUrl.update({
        where: {
          id: reelId
        },
        data: {
          likesCount: {
            decrement: 1
          }
        }
      });
      return res.status(200).json({ message: "Removed Like On Reel." });
    }

    await prisma.reelLike.create({
      data: {
        userId: userId,
        reelId: reelId
      }
    });

    await prisma.postUrl.update({
      where: {
        id: reelId
      },
      data: {
        likesCount: {
          increment: 1
        }
      }
    });
    return res.status(200).json({ message: "Liked the Reel." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getStatusOfLikeOnReel = async (req, res) => {
  try {
    const { userId, reelId } = req.params;
    if (!userId || !reelId)
      return res
        .status(200)
        .json({ message: "Status of like on reel", like: false });

    const likeData = await prisma.reelLike.findFirst({
      where: {
        userId: userId,
        reelId: reelId
      }
    });

    if (likeData) {
      return res
        .status(200)
        .json({ message: "Status of like on reel", like: true });
    }

    return res
      .status(200)
      .json({ message: "Status of like on reel", like: false });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error.", error: error.message });
  }
};

export { toggleLikeOnReel, getStatusOfLikeOnReel };
