import express from "express"
import { 
  getPosts, 
  getPost, 
  createPost,
  deletePost 
} from "../controllers/post.controller.js"

const router = express.Router();

// retrieves all posts
router.get("/", getPosts);

// retrieves a single post
router.get("/:slug", getPost);

// create a post
router.post("/", createPost)

// delete a post
router.delete("/:id", deletePost)

export default router