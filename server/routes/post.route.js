import express from "express"
import { 
  getPosts, 
  getPost, 
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js"
import increaseVisit from "../middlewares/increaseVisit.js"

const router = express.Router();

router.get("/upload-auth", uploadAuth);

// retrieves all posts
router.get("/", getPosts);

// retrieves a single post
router.get("/:slug", increaseVisit, getPost);

// create a post
router.post("/", createPost);

// delete a post
router.delete("/:id", deletePost);

// feature a post (admin only)
router.patch("/feature", featurePost);


export default router