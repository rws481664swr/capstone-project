import {getPost} from "./db/posts.js";
import {getUser} from "./db/users.js";
import {ForbiddenError, NotFoundError} from "./util/Errors.js";
import {ADMIN, TEACHER} from "./roles.js";
import {Comments, Posts} from "./db/schemas/models.js";

export const userInPostsClass = async ({body: {post: post_id}}, res, next) => {
    const {locals: {user: {username}}} = res
    const [post, user] = await Promise.all([
        getPost(post_id, {course: true}),
        getUser(username, true)
    ])
    const {course} = post
    const courses = user.courses.map(({_id}) => _id.toString())
    const courseID = course._id.toString()
    if (courses.includes(courseID)) {
        return next()
    }
    return next(new ForbiddenError('cannot comment on this post'))
}
export const userMustBeInPostCourse = async ({params: {_id}}, {locals: {user: {_id: userid, role}}}, next) => {
    if (role === ADMIN) return next()
    try {

        const post = await Posts
            .findById(_id)
            .populate('course')
            .exec()
        if (post === null) throw new NotFoundError('Post not found')
        const userInCourse = post.course.hasMember(userid)
        if (userInCourse) return next()
        throw new ForbiddenError("User not in post's course")
    } catch (e) {
        next(e)
    }
}
export const userOwnsComment = async ({params: {_id}}, {locals: {user: {username, role}}}, next) => {
    try {
        if (role === ADMIN) return next()
        const comment = await Comments.findById(_id).exec()
        if (comment === null) throw new NotFoundError('comment not found')
        return comment.username === username ? next() : next(new ForbiddenError('Unauthorized'))
    } catch (e) {
        next(e)
    }
}
export const userOwnsCommentOrTeacher = async ({params: {_id}}, {
    locals: {
        user: {
            _id: user_id,
            role,
            username
        }
    }
}, next) => {

    try {
        const [comment
            , user] =
            await Promise.all([Comments
                .findById(_id)
                .populate({
                    path: "post",
                    populate: {path: "course"}
                }).exec(),
                // getUser(username)
            ]);
        const {post} = comment
        const {course} = post
        if (course.hasMember(user_id) && role === TEACHER)
            return next()
        else if (comment.username === username)
            return next()
        else
            return next(new ForbiddenError('Unauthorized access'))
    } catch (e) {
        return next(e)
    }
}
