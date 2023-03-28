import express from "express";
import {getPost, getPostsFromCourse, getPostsFromUser, pinPost, unpinPost, updatePost} from "../db/posts.js";
import {BadRequestError} from "../util/Errors.js";
import {Posts} from "../db/schemas/models.js";
import {ensureLoggedIn} from "../middleware/authToken.js";

const router = express.Router()
export default router

router.get('/', ensureLoggedIn, async (req, res) => {
})
router.get('/:id', ensureLoggedIn, async ({params: {id}, query: {course, user}}, res, next) => {
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

router.get('/users/:user', ensureLoggedIn, async ({params: {user}, query: {sort}}, res, next) => {
    try {
        sort = getSort(sort)
        const results = await getPostsFromUser(user, sort)
        return res.json(results)
    } catch (e) {
        next(e)
    }
})

router.get('/courses/:course', ensureLoggedIn, async ({params: {course}, query: {sort}}, res, next) => {
    try {
        sort = getSort(sort)
        const results = await getPostsFromCourse(course, sort)
        return res.json(results)
    } catch (e) {
        next(e)
    }
} /*ensureEnrolledOrProf*/)

router.post('/', ensureLoggedIn, async ({   body }, res, next) => {
    try {
        const post = await Posts.create({...body,pinned:false, postDate: new Date()})
        res.status(201).json(post)
    } catch (err) {
        return next(err)
    }
})


router.put('/:_id', ensureLoggedIn, async ({body: {content}, params: {_id}}, res, next) => {
    try {
        if (!content) throw new BadRequestError('Body has no content')
        await updatePost(_id, {content})
        res.json({message: "Updated!"})
    } catch (e) {
        return next(e)
    }
})


router.put('/:_id/pin', ensureLoggedIn, async ({params: {_id}}, res, next) => {
    try {
        await pinPost(_id)
        res.json({message: "pinned!"})
    } catch (e) {
        next(e)
    }

})
router.put('/:_id/unpin', ensureLoggedIn, async ({params: {_id}}, res, next) => {

    try {
        await unpinPost(_id)
        res.json({message: "unpinned!"})
    } catch (e) {
        next(e)
    }

})

router.delete('/:_id', ensureLoggedIn, async ({params: {_id}}, res, next) => {

    const {...rest} = await Posts.findOneAndDelete({_id}).exec()
    res.json({deleted: 'true'})

})