import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

import dotenv from 'dotenv';
dotenv.config();



export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 5

  const posts = await Post.find()
    .populate("user", "username") // get username from find
    .limit(limit)
    .skip((page-1)*limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img"
  );
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

  // title --> slug
  let baseSlug = req.body.title.replace(/ /g, "-").toLowerCase();
  let slug = baseSlug;
  let counter = 2;
  let existingPost = await Post.findOne({ slug });
  while (existingPost) {
    slug = `${baseSlug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }

  const newPost = new Post({user: user._id, slug, ...req.body });

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

// for uploading images to imagekit
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// const imagekit = new ImageKit({
//   urlEndpoint: 'https://ik.imagekit.io/meganl1e',
//   publicKey: 'public_G1MAAB1KX+d2bdPT8gmK/7ZVxwE=',
//   privateKey: 'private_OMLb/ViE2b2QO4fxpv4cIXdVz4E=',
// });

// export const uploadAuth = async (req, res) => {
//   const result = imagekit.getAuthenticationParameters();
//   console.log("result:" + result)
//   res.send(result);
// };

export const uploadAuth = async (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    console.log('Authentication Parameters:', result);
    
    if (!result || !result.signature) {
      throw new Error('Failed to generate authentication parameters.');
    }
    
    res.json(result); // Use res.json() instead of res.send() for JSON data
  } catch (error) {
    console.error('Error generating authentication parameters:', error);
    res.status(500).json({ message: 'Failed to generate authentication parameters.' });
  }
};