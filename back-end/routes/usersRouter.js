import express from "express";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../db/users.js";
import {BadRequestError, ExpressError} from "../util/Errors.js";
import {changePassword} from "../db/creds.js";
import {ensureAdmin, ensureLoggedIn} from "../middleware/authToken.js";
import {mustBeUsernameOrAdmin} from '../middleware/predicates.js'

export const usersRouter = express.Router()
usersRouter.use(ensureLoggedIn)



usersRouter.get('/', ensureAdmin, async ({query: {username}}, res, next) => {
    try {
if (!['asc','desc'].includes(username) ) throw new BadRequestError()
    const sort = username === 'asc'
            ? 1 : (username === 'desc' ? -1 : 1)
        const response = await getUsers({username: sort})
        res.json(response)
    } catch (e) {
        return next(e)
    }

})

usersRouter.get('/:username', mustBeUsernameOrAdmin, async ({params: {username}}, res, next) => {
    try {
        const user= await getUser(username, false)
        if (user===null)throw new BadRequestError('user not found')
        res.json(user)

    } catch (e) {

        return next(e)
    }

})

usersRouter.get('/:username/courses', mustBeUsernameOrAdmin, async ({params: {username}}, res, next) => {

    try {

        res.json(await getUser(username, true))
    } catch (e) {

        return next(new ExpressError(e.message))
    }


})

usersRouter.put('/:username', mustBeUsernameOrAdmin, async ({params: {username}, body}, res, next) => {
    try {
        if ("username" in body) {
            throw new BadRequestError('cannot change username')
        }
        res.json(await updateUser(username, body))
    } catch (e) {
        return next(e)
    }
})

usersRouter.put('/:username/password', mustBeUsernameOrAdmin, async ({
                                                                    params: {username},
                                                                    body: {password, old}
                                                                }, res, next) => {
    try {
        await changePassword(username, old, password)
        res.json({message: "updated"})
    } catch (e) {
        return next(e)
    }

})

usersRouter.post('/', ensureAdmin,async ({body}, res, next) => {
    try {
        const post = await createUser(body)
        res.json(post)
    } catch (e) {

        return next(new ExpressError(e.message))
    }
})

usersRouter.delete('/:username', mustBeUsernameOrAdmin, async ({params: {username}}, res, next) => {
    try {
        const {acknowledged} = await deleteUser(username)
        if (acknowledged)
            return res.json({message: 'deleted'})
        throw new ExpressError('Deletion error')
    } catch (e) {
        return next(new ExpressError(e.message))
    }
})
