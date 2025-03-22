import express from "express";
import connectDB from "./lib/connectDB.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import webhookRouter from "./routes/webhook.route.js";
import { clerkMiddleware, requireAuth } from '@clerk/express'; // checks request's cookies and headers for a session jwt (if you are logged in as a user --> you can create/update/delete blog posts)
import cors from "cors";


// enable env variables
import { config } from 'dotenv';
config()


const app = express();

const PORT = process.env.PORT || 3000; // Use Render's dynamic port or fallback to 3000

app.use(cors({
  origin: process.env.CLIENT_URL, // Use CLIENT_URL from environment variables
  credentials: true, // Allow cookies and credentials
}));

app.use(clerkMiddleware());
app.use("/webhooks", webhookRouter); // this does not use express, so put this line before app.use(express())

app.use(express.json()); // middleware func that allows us to send json files

//imagekit to upload images to a post
// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);


// error handler (middleware func)
// allows you to not have to use try catch anymore
app.use((error,req,res,next) => {
  res.status(error.status || 500); // set the http status code of the response

  // send a json response with error details
  res.json({
    message:error.message || "something went wrong",
    status:error.status,
    stack:error.stack, // useful in dev for debugging
  });
});

app.listen(PORT, () => {
  connectDB()
  console.log("server is running")
})