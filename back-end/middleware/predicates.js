import {getUser} from "../db/users.js";
import {Comments, Posts} from "../db/schemas/models.js";
import {getPost} from "../db/posts.js";
import {ADMIN} from "../roles.js";
import {ForbiddenError} from "../util/Errors.js";

export const isLoggedIn = ({locals: {user}}) => user && true
export const isAdmin = ({locals: {user: {role}}}) => role === "ADMIN" && true
export const isTeacher = ({locals: {user: {role}}}) => role === "TEACHER" && true
export const isStudent = ({locals: {user: {role}}}) => role === "STUDENT" && true
const usernameIsUser = (u, {locals: {user}}) => u === user.username

export const teacherOwns = async (teacher, course) => {
    const {courses} = await getUser(teacher)
    return courses.map(({_id}) => _id.toString()).includes(course.toString())
}
export const userEnrolledIn = teacherOwns

export const postBelongsToUser = async (username, post_id) => {
    return ((await Posts.findOne({username, _id: post_id})) && true) || false
}
export const postBelongsToCourse = async (course, post_id) => {
    return ((await Posts.findOne({course, _id: post_id})) && true) || false
}
export const teacherCanPin = async (teacher, post_id) => {
    const [user, post] = await Promise.all([
        getUser(teacher),
        getPost(post_id)
    ])
    const {courses} = user.toJSON()
    const {course} = post
    return courses.map(e => e.toString()).includes(course.toString())
}

export const userCanComment = async (username, post) => {

    const {course:course_id} = await getPost(post)
    const user= await getUser(username)
    const course = course_id.toString()
    const courses=user.courses.map(course => course.toString())
    const includesCourse= courses.includes(course)
    return (includesCourse && true) || false
}

export const mustBeUsernameOrAdmin=({params:{username}}, {locals},next)=>{
    try{
        const{user: {username:uname,role}}=locals
        if( username===uname || role ===ADMIN ) return next()
        throw new ForbiddenError("Must be user to perform action")

    }catch (e) {
        return next(e)
    }

}