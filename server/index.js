import express from "express"
import connectDB from "./lib/connectDB.js"
import userRouter from "./routes/user.route.js"
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js"
import webhookRouter from "./routes/webhook.route.js"

// enable env variables
import { config } from 'dotenv';
config()


const app = express();
app.use("/webhooks", webhookRouter); // this does not use express, so put this line before app.use(express())

app.use(express.json()); // middleware func that allows us to send json files

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



app.listen(3000, () => {
  connectDB()
  console.log("server is running")
})