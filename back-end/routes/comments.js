import express from "express";
import {ensureLoggedIn} from "../middleware/authToken.js";
import {createComment, editComment, getComments, removeComment} from '../db/comments.js'
import {BadRequestError} from "../util/Errors.js";
import {
    userInPostsClass,
    userMustBeInPostCourse,
    userOwnsComment,
    userOwnsCommentOrTeacher
} from "../comments-security-middleware.js";

export const commentsRouter = express.Router()
commentsRouter.use(ensureLoggedIn)


commentsRouter.get('/:_id', userMustBeInPostCourse, async ({params: {_id}}, res, next) => {
    try {
        const comments = await getComments(_id)
        res.json(comments)
    } catch (e) {
        return next(e)
    }
})

commentsRouter.post('/', userInPostsClass, async ({body: {post, ...comment}}, res, next) => {

    try {
        const{locals:{user:{username}}}=res
        const _comment = await createComment(post, {...comment, username, timestamp: Date.now()})
        return res.status(201).json(_comment)
    } catch (e) {
        return next(e)
    }
})

commentsRouter.put('/:_id', userOwnsComment, async ({params: {_id}, body: {content}}, res, next) => {
    try {
        if (!_id) throw new BadRequestError('no comment id provided')
        if (!content) throw new BadRequestError('no data provided')
        const comment = await editComment(_id, content)
        return res.json(comment)
    } catch (e) {
        return next(e)
    }
})

commentsRouter.delete('/:_id', userOwnsCommentOrTeacher, async ({params: {_id}}, res, next) => {


    try {
        await removeComment(_id)
        res.json({message: 'deleted'})

    } catch (e) {
        return next(e)
    }
})