import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../db/users.js";
import {createPost} from "../db/posts.js";
import {BadRequestError, ExpressError} from "../util/Errors.js";

const router = express.Router()
export default router


router.get('/', async ({query: {username}}, res, next) => {
    try {
        const sort = username === 'asc'
            ? 1 : (username === 'desc' ? -1 : 1)
        const response = await getUsers({username: sort || 1})
        res.json(response)
    } catch (e) {
        return next(e)
    }

})

router.get('/:username', async ({params: {username}}, res, next) => {
    try {
        res.json(await getUser(username, false))

    } catch (e) {

        return next(new ExpressError(e.message))
    }

})

router.get('/:username/courses', async ({params: {username}}, res, next) => {

    try {

        res.json(await getUser(username, true))
    } catch (e) {

        return next(new ExpressError(e.message))
    }


})

router.put('/:username', async ({params: {username}, body}, res, next) => {
    try {
        if ("username" in body) {
            throw new BadRequestError('cannot change username')
        }
        res.json(await updateUser(username, body))
    } catch (e) {

        return next(e)
    }

})

router.post('/', async ({body}, res, next) => {
    try {
        const post = await createUser(body)
        res.json(post)
    } catch (e) {

        return next(new ExpressError(e.message))
    }
})

router.delete('/:username', async ({params: {username}}, res, next) => {
    try {
        const {acknowledged} = await deleteUser(username)
        if (acknowledged)
            return res.json({message: 'deleted'})
        throw new ExpressError('Deletion error')
    } catch (e) {
        return next(new ExpressError(e.message))
    }
})
