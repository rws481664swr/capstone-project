import express from "express";
import {deleteUser, getUser, getUsers, updateUser} from "../db/users.js";

const router = express.Router()
export default router


router.get('/', async ({query: {username}}, res, next) => {
    try {
        console.log(res.locals)
        res.json(await getUsers({
            username: username === 'asc'
                ? 1 : (username === 'desc' ? -1 : 1)
        }))
    } catch (e) {

        return next()
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

        return next(new ExpressError(e.message))
    }

})

router.post('/', async (req, res, next) => {
    try {

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