import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  res.status(200).json(post);
};

export const createPost = async (req, res) => {

  // check if you are authenticated
  const clerkUserId = req.auth.userId;

  // check auth
  console.log(req.headers);

  if (!clerkUserId){
    return res.status(401).json("not authenticated")
  }

  const user = await User.findOne({clerkUserId})
  if (!user){
    return res.status(404).json("user not found")
  }

  const newPost = new Post({user: user._id, ...req.body });

  const post = await newPost.save();
  res.status(200).json(post);
};

export const deletePost = async (req, res) => {

  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json("not authenticated")
  }

  const user = await User.findOne({ clerkUserId });

  // find post that is yours (you cannot delete other people's posts)
  const deletedPost = await Post.findOneAndDelete({ 
    _id: req.params.id,
    user:user._id
  })

  if (!deletedPost) {
    return res.status(403).json("you cannot delete this post bc it's not your post")
  }

  res.status(200).json("post has been deleted");
};

