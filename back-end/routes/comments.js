import express from "express";
import {ensureLoggedIn} from "../middleware/authToken.js";
import {createComment, getComments, removeComment,editComment} from './../db/comments.js'
import {BadRequestError} from "../util/Errors.js";

const router = express.Router()
router.use(ensureLoggedIn)

export default router

router.get('/:post_id', async ({params: {post_id}}, res, next) => {
    try {
        const comments = await getComments(post_id)
        res.json(comments)
    } catch (e) {
        return next(e)
    }
})
router.post('/', async ({body: {post,... comment}}, res, next) => {
    try {
        const _comment = await createComment(post, comment)
        return res.status(201).json(_comment)
    } catch (e) {
        return next(e)
    }
})
router.put('/:id', async ({params:{id},body: { comment:c}}, res, next) => {
    try {
        if (!id) throw new BadRequestError('no comment id provided')
        if (!c) throw new BadRequestError('no data provided')
        const comment = await editComment(id, c)
        return res.json(comment)
    } catch (e) {
        return next(e)
    }
})
router.delete('/:cid', async ({params: {cid}}, res, next) => {
    try {
        await removeComment(cid)
         res.json({message:'deleted'})

    } catch (e) {
        return next(e)
    }
})