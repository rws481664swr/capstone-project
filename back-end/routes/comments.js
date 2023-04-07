import express from "express";
import {ensureLoggedIn} from "../middleware/authToken.js";
import {createComment, getComments, removeComment} from './../db/comments.js'

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
router.post('/', async ({body: {post, comment}}, res, next) => {
    try {
        const _comment = await createComment(post, comment)
        return res.json(_comment)
    } catch (e) {
        return next(e)
    }
})
router.delete('/:cid', async ({params: {cid}}, res, next) => {
    try {
        await res.json(removeComment(cid))
    } catch (e) {
        return next(e)
    }
})