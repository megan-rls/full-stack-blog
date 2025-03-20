import Post from "../models/post.model.js";

const increaseVisit = async (req, res, next) => {
  const slug = req.params.slug;

  await Post.findOneAndUpdate({ slug }, { $inc: { visit: 1 } });

  next();
};

export default increaseVisit;

// this middleware is in the post route js, this is not necessary here but good practice