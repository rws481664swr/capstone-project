
import auth from "./auth.js";
import comments from "./comments.js";
import courses from "./courses.js";
import posts from "./posts.js";
import users from "./users.js";

describe('middleware security',()=>{
    describe('auth routes',auth)
    describe('comments routes',comments)
    describe('courses routes',courses)
    describe('posts routes',posts)
    describe('users routes',users)
})