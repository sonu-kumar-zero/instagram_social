import { Router } from "express";
import {
  acceptFollowingRequest,
  createUser,
  getAllFollowersOfUserByUserId,
  getAllUserWhoseUserNameContainsAString,
  getUserDataByUserName,
  removeFollowingRequest,
  sendFollowingRequest,
  updateUserBioAndName,
  userLogIn,
  getAllFollowingOfUserByUserId,
  getStatusOfFollowRequest,
  updateUserProfileType
} from "../controllers/user.controller.js";
import { userVerifyMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", userLogIn);

router.put("/user/profileType", updateUserProfileType);

router.put("/data", updateUserBioAndName);
router.get("/data/:userName", getUserDataByUserName);

router.get("/search/:userName", getAllUserWhoseUserNameContainsAString);

router.get("/follow/follower/:userId", getAllFollowersOfUserByUserId);
router.get("/follow/following/:userId", getAllFollowingOfUserByUserId);

router.get("/follow/status/:followerId/:followingId", getStatusOfFollowRequest);
// followerId => That User Who is Sending the request
// followingId => That User Who is receiving the request
router.post(
  "/follow/:followerId/:followingId",
  // userVerifyMiddleware,
  sendFollowingRequest
);

// followingId => That User Who is receiving the request
// followerId => That User Who is Sending the request
router.put(
  "/follow/:followingId/:followerId",
  // userVerifyMiddleware,
  acceptFollowingRequest
);

router.delete(
  "/follow/:followingId/:followerId",
  // userVerifyMiddleware,
  removeFollowingRequest
);

export default router;
