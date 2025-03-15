import mongoose from "mongoose"
import { Schema } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  savedArray: {
    type: [String],
    default: [],
  },
  }, 
  { timestamps: true } 
  // "updated on" field
);

export default mongoose.model("User", userSchema);