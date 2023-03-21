
import postSchema from "./posts.js";
import courseSchema from "./courses.js";
import userSchema from "./users.js";
import {model} from "mongoose";


export const Posts = model("Post",postSchema);

export const Courses  = model("Course", courseSchema)

export const Users = model("User", userSchema)


