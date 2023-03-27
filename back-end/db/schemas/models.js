import postSchema from "./posts.js";
import courseSchema from "./courses.js";
import userSchema from "./users.js";
import {model, Schema} from "mongoose";


export const Posts = model("Post", postSchema);

export const Courses = model("Course", courseSchema)

export const Users = model("User", userSchema)


export const Credentials = model("Credentials", new Schema({
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
}))