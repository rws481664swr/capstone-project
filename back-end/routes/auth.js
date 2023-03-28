import express from "express";
import {login} from "../db/creds.js";
import {BadRequestError, UnauthorizedError} from "../util/Errors.js";
import {createUser, getUser} from "../db/users.js";
import createToken from '../createToken.js'

const router = express.Router()
export default router


router.post('/login', async ({body: {username, password}}, res, next) => {
    try {
        const isLoggedIn = await login(username, password)
        if (!isLoggedIn) throw new UnauthorizedError("Invalid username/password")
        const {role}= await getUser(username)
        const token = createToken(username,role)
        return res.json({token})
    } catch (e) {
        next(e)
    }
})

router.post('/register', async ({body}, res, next) => {
    try {
        if(!body.password) throw new BadRequestError('Must provide a password')
        const user = await createUser(body)
        const token = createToken(user.username,user.role)
        res.json({token})
    } catch (e) {
        next(e)
    }
})
