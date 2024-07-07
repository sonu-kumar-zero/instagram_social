import prisma from "../db/db.config.js";

const getRecentPostsAccordingToLimit = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
      where: {
        user: {
          profileType: "PUBLIC"
        }
      },
      include: {
        user: true,
        postUrls: true
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    });
    return res
      .status(200)
      .json({ message: `All Recent Post of page ${page}`, post: posts });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRecentReelsAccordingToLimit = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 5;
    const skip = (page - 1) * limit;
    const reels = await prisma.postUrl.findMany({
      where: {
        post: {
          user: {
            profileType: "PUBLIC"
          }
        },
        type: "VIDEO"
      },
      include: {
        post: {
          include: {
            user: true
          }
        }
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    });

    return res
      .status(200)
      .json({ message: `All Recent Reel of page ${page}`, reel: reels });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

export { getRecentPostsAccordingToLimit, getRecentReelsAccordingToLimit };
