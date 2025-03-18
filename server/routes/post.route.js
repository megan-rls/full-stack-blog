import express from "express"
import { 
  getPosts, 
  getPost, 
  createPost,
  deletePost,
  uploadAuth,
} from "../controllers/post.controller.js"

const router = express.Router();

router.get("/upload-auth", uploadAuth);

// retrieves all posts
router.get("/", getPosts);

// retrieves a single post
router.get("/:slug", getPost);

// create a post
router.post("/", createPost);

// delete a post
router.delete("/:id", deletePost);


export default router