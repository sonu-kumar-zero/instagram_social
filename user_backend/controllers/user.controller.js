import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (password.length < 8) {
      return res.status(400).json({ message: "Password is too small." });
    }
    const findUserWithEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (findUserWithEmail) {
      return res
        .status(400)
        .json({ message: "Email Already Exist, Try to do Login" });
    }

    const hashPassword = await bcrypt.hash(password, 5);

    const newUserCreate = await prisma.user.create({
      data: {
        userName,
        email,
        password: hashPassword
      }
    });

    const userSavedData = await prisma.userSaved.create({
      data: {
        givenName: "All Posts",
        userId: newUserCreate.id
      }
    });

    await prisma.user.update({
      where: {
        id: newUserCreate.id
      },
      data: {
        userDefaultSavedId: userSavedData.id
      }
    });

    return res.status(200).json({
      message: "User Created"
    });
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const userLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUserWithEmail = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { userName: email }]
      }
    });
    if (!findUserWithEmail) {
      return res
        .status(404)
        .json({ message: "Email Does Not Exist, Try to Sign Up First" });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      findUserWithEmail.password
    );

    if (!passwordMatch) {
      return res.status(404).json({ message: "Some Error in Data" });
    }

    const token = jwt.sign(
      { userId: findUserWithEmail.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Successful Login",
      token,
      user: findUserWithEmail
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const sendFollowingRequest = async (req, res) => {
  try {
    const { followerId, followingId } = req.params;
    if (followerId === followingId) {
      return res.status(205).json({ message: "You can't follow yourself." });
    }
    const followerUser = await prisma.user.findUnique({
      where: {
        id: followerId
      }
    });

    if (!followerUser) {
      return res.status(404).json({ message: "id is not defined." });
    }
    const followingUser = await prisma.user.findUnique({
      where: {
        id: followingId
      }
    });

    if (!followingUser) {
      return res.status(404).json({ message: "id is not defined." });
    }

    const alreadySended = await prisma.follower.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId
      }
    });

    if (alreadySended && alreadySended.isAccepted)
      return res.status(200).json({
        message: "You Already Follow The Person."
      });

    if (alreadySended)
      return res.status(200).json({
        message: "Already Sended Follwing Request"
      });

    if (followingUser && followingUser.profileType === "PUBLIC") {
      await prisma.follower.create({
        data: {
          followerId,
          followingId,
          isAccepted: true
        }
      });

      await prisma.user.update({
        where: {
          id: followingId
        },
        data: {
          followerCount: {
            increment: 1
          }
        }
      });

      await prisma.user.update({
        where: {
          id: followerId
        },
        data: {
          followingCount: {
            increment: 1
          }
        }
      });

      return res.status(200).json({
        message: "You are now following User"
      });
    }

    await prisma.follower.create({
      data: {
        followerId,
        followingId
      }
    });

    return res.status(200).json({
      message: "Successful Follwing Request"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const acceptFollowingRequest = async (req, res) => {
  try {
    const { followerId, followingId } = req.params;
    const followRequest = await prisma.follower.findFirst({
      where: {
        followerId,
        followingId
      }
    });

    if (!followRequest) {
      return res.status(404).json({ message: "not found" });
    }

    if (followRequest.isAccepted) {
      return res.status(200).json({ message: "Already Accepted" });
    }

    await prisma.user.update({
      where: {
        id: followingId
      },
      data: {
        followerCount: {
          increment: 1
        }
      }
    });

    await prisma.user.update({
      where: {
        id: followerId
      },
      data: {
        followingCount: {
          increment: 1
        }
      }
    });

    await prisma.follower.update({
      where: {
        id: followRequest.id
      },
      data: {
        isAccepted: {
          set: true
        }
      }
    });

    return res.status(200).json({
      message: "Successful Accepted Request"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// also works when someone wants to remove accepted follow request
const removeFollowingRequest = async (req, res) => {
  try {
    const { followerId, followingId } = req.params;
    const followRequest = await prisma.follower.findFirst({
      where: {
        OR: [
          { followerId: followerId, followingId: followingId },
          { followerId: followingId, followingId: followerId }
        ]
      }
    });

    if (!followRequest) {
      return res.status(404).json({ message: "not found" });
    }

    if (!followRequest.isAccepted) {
      await prisma.follower.delete({
        where: {
          id: followRequest.id
        }
      });
      return res.status(200).json({ message: "Done" });
    }

    const userWhoseFollowCountWillDecrease = followRequest.followingId;
    const userWhoseFollowingCountWillDecrease = followRequest.followerId;

    await prisma.user.update({
      where: {
        id: userWhoseFollowCountWillDecrease
      },
      data: {
        followerCount: {
          decrement: 1
        }
      }
    });

    await prisma.user.update({
      where: {
        id: userWhoseFollowingCountWillDecrease
      },
      data: {
        followingCount: {
          decrement: 1
        }
      }
    });

    await prisma.follower.delete({
      where: {
        id: followRequest.id
      }
    });

    return res.status(200).json({
      message: "Successful Removed Follwing Request"
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateUserBioAndName = async (req, res) => {
  try {
    const { name, bio, userId } = req.body;
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: name,
        bio: bio
      }
    });
    res.status(200).json({ message: "Successfully updated user details" });
  } catch (error) {
    res
      .json({ message: "Internal Server Error", error: error.message })
      .status(500);
  }
};

const getUserDataByUserName = async (req, res) => {
  try {
    const { userName } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        userName: userName
      }
    });
    if (user) {
      user.password = null;
      user.email = null;
      return res.status(200).json({ message: "Done!!!", user });
    }
    return res.status(404).json({ message: "UserName not found" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllUserWhoseUserNameContainsAString = async (req, res) => {
  try {
    const { userName } = req.params;
    const allUsers = await prisma.user.findMany({
      where: {
        userName: {
          contains: userName,
          mode: "default"
        }
      }
    });
    return res
      .status(200)
      .json({ message: "All Users Of Given UserName String", users: allUsers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllFollowersOfUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const allFollowers = await prisma.follower.findMany({
      where: {
        followingId: userId
      },
      include: {
        follower: {
          include: true
        }
      }
    });
    return res
      .status(200)
      .json({ message: "All Users Followers", users: allFollowers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllFollowingOfUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const allFollowing = await prisma.follower.findMany({
      where: {
        followerId: userId
      },
      include: {
        following: {
          include: true
        }
      }
    });
    return res
      .status(200)
      .json({ message: "All Users Followings", users: allFollowing });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getStatusOfFollowRequest = async (req, res) => {
  try {
    const { followerId, followingId } = req.params;
    const followResponse = await prisma.follower.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId
      }
    });
    if (!followResponse)
      return res.status(404).json({
        message: "This follow request does not exist."
      });

    return res
      .status(200)
      .json({ message: "Follow Status", status: followResponse });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const updateUserProfileType = async (req, res) => {
  try {
    const { userId, nowProfileType } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        profileType: nowProfileType
      }
    });

    return res
      .status(200)
      .json({ message: "Profile Type Changed Successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export {
  createUser,
  userLogIn,
  sendFollowingRequest,
  acceptFollowingRequest,
  removeFollowingRequest,
  updateUserBioAndName,
  getUserDataByUserName,
  getAllUserWhoseUserNameContainsAString,
  getAllFollowersOfUserByUserId,
  getAllFollowingOfUserByUserId,
  getStatusOfFollowRequest,
  updateUserProfileType
};
