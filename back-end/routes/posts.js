import express from "express";
import {getPost} from "../db/posts.js";
import Posts from "../db/schemas/posts.js";

const router = express.Router()
export default router
router.get('/', async (req, res) => {
})
router.get('/:id', async ({
                              params: {id},query:{course, user}
                          }, res) => {

    try {
        const post = await getPost(id, {course, user})
        res.json(post)

    }catch (e) {
        res.json({})
    }
})
router.put('/:id', async (req, res) => {
})
router.post('/', async (req, res) => {
})
router.delete('/:id', async (req, res) => {
})

router.post('/:id/pin', async (req, res) => {
})
router.post('/:id/unpin', async (req, res) => {
})