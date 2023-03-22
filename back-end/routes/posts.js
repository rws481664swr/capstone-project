import express from "express";
import {getPost, getPostsFromCourse, getPostsFromUser} from "../db/posts.js";
import {BadRequestError} from "../util/Errors.js";
import {Posts} from "../db/schemas/models.js";
// import ensureEnrolledOrProf from '../authorization/ensureEnrolledOrProf.js'
const router = express.Router()
export default router
router.get('/', async (req, res) => {
})
router.get('/:id', async ({params: {id}, query: {course, user}}, res, next) => {
    try {
        let opts = {course, user}
        const post = await getPost(id, opts)
        res.json(post)
    } catch (e) {
        next(e)
    }
})

function getSort(sort) {
    if (sort) {
        const keys = Object.keys(sort)
        const [key] = keys
        let value
        if (key) value = parseInt(sort[key])
        sort = {[key]: value}
    }
    return sort
}

router.get('/users/:user', async ({params: {user}, query: {sort}}, res, next) => {
    sort = getSort(sort)
    return res.json(await getPostsFromUser(user, sort))
})

router.get('/courses/:course' /*ensureEnrolledOrProf*/, async ({params: {course}, query: {sort}}, res, next) => {
    sort = getSort(sort)
    const results = await getPostsFromCourse(course, sort)
    return res.json(results)
})

router.post('/', async ({body: {course, username, user, content, pinned = false, ...rest}}, res, next) => {
    try {
        if (!content) throw new BadRequestError('Content was empty')
        if (Object.keys(rest).length) throw new BadRequestError("Invalid extra data was sent")
        if (!(course && username && user && content && pinned !== undefined)) throw new BadRequestError("Invalid Data")
        const post = await Posts.create({course, username, user, content, pinned, postDate: new Date()})
        res.status(201).json(post)
    } catch (err) {
        return next(err)
    }
})


router.put('/:id', async (req, res, next) => {
})


router.put('/:id/pin', async (req, res, next) => {
})
router.put('/:id/unpin', async (req, res, next) => {
})

router.delete('/:id', async (req, res, next) => {
})