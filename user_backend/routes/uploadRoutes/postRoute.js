import { Router } from "express";
import {
  deleteUploadedPost,
  getAllPostOfUser,
  newPostUpload
} from "../../controllers/post.upload.controller.js";

import {
  writeCommentOnGivenPostId,
  getAllCommentsOfGivenPostId,
  deleteComment,
  getAllCommentsOfGivenParentCommentId,
  toggleLikeOnComment,
  getLikeStatusOnCommentByUserIdAndCommentId
} from "../../controllers/post.comment.controller.js";

import {
  toggleLikeOnPost,
  getLikeStatusOfPostByUserId
} from "../../controllers/post.like.controller.js";

import {
  createNewCollectionOfUser,
  getAllCollectionNameOfUser,
  getAllSavedPostOfUser,
  statusOfPostPresentInCollection,
  toggleSavedPostInCollection
} from "../../controllers/post.saved.controller.js";

const router = Router();

router.get("/saved/post/collection/:userId", getAllCollectionNameOfUser);

router.get("/saved/post/all/:userId", getAllSavedPostOfUser);
router.post("/saved/post/container/:userId", createNewCollectionOfUser);

router.get(
  "/saved/post/:userId/:postId/:collectionId",
  statusOfPostPresentInCollection
);

router.post(
  "/saved/post/:userId/:postId/:collectionId",
  toggleSavedPostInCollection
);

router.get(
  "/comment/commentoncomment/:parentCommentId",
  getAllCommentsOfGivenParentCommentId
);

router.get(
  "/comment/like/:userId/:commentId",
  getLikeStatusOnCommentByUserIdAndCommentId
);
router.post("/comment/like/:userId/:commentId", toggleLikeOnComment);

router.get("/comment/:postId", getAllCommentsOfGivenPostId);
router.post("/comment/:userId/:postId", writeCommentOnGivenPostId);
router.delete("/comment/:userId/:postId/:commentId", deleteComment);

router.get("/like/post/:userId/:postId", getLikeStatusOfPostByUserId);
router.post("/like/post/:userId/:postId", toggleLikeOnPost);

router.get("/:userId", getAllPostOfUser);
router.post("/:userId", newPostUpload);
router.delete("/:userId", deleteUploadedPost);
router.delete("/:userId/:postId", deleteUploadedPost);

export default router;
