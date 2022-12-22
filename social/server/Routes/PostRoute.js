import express from "express";
import {
  commentPost,
  createPost,
  deleteComment,
  deletePost,
  editComment,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";
const router = express.Router();
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id/comment/:cId", editComment);
router.delete("/:id/comment/:cId", deleteComment);
router.put("/:id", updatePost);
router.delete("/:userId/delete/:id", deletePost);
router.put("/:id/like", likePost);
router.put("/:id/comment", commentPost);
router.get("/:id/timeline", getTimelinePosts);
export default router;
