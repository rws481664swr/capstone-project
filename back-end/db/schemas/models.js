import {model} from "mongoose";
import commentsSchema from "./commentsSchema.js";
import courseSchema from "./coursesSchema.js";
import userSchema from "./userSchema.js";
import credSchema from "./credSchema.js";
import postSchema from "./postSchema.js";

export const Posts = model("Post", postSchema);
export const Courses = model("Course", courseSchema)
export const Users = model("User", userSchema)
export const Credentials = model("Credentials", credSchema)
export const Comments = model("Comments", commentsSchema)
