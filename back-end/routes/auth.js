import express from "express";
import {login} from "../db/creds.js";
import {BadRequestError, UnauthorizedError} from "../util/Errors.js";
import {createUser, getUser} from "../db/users.js";
import createToken from '../createToken.js'
import {isLoggedIn} from "../middleware/predicates.js";
import {Users,Credentials} from "../db/schemas/models.js";
import {STUDENT} from "../util/roles.js";

export const authRouter = express.Router()

const notLoggedIn = (req, res, next) => {

}

function ensureLoggedOut(type='log in') {
    return (req, res, next)=> {
        try {
            if (isLoggedIn(res)) {
                throw new BadRequestError(`Cannot ${type} twice`);
            }
            return next();
        } catch (err) {
            return next(err);
        }
    }
}

authRouter.post('/login', ensureLoggedOut(), async ({body: {username, password}}, res, next) => {
    try {
        const isLoggedIn = await login(username, password)
        console.log(isLoggedIn)
        if (!isLoggedIn) throw new UnauthorizedError("Invalid username/password")
        const user = await getUser(username)
        //TODO deal with case where user === NULL & send 404
        //TODO fix tests for 404 case
        const {role,_id}=user
        const token = createToken(username, role,_id.toString())
        return res.json({token})
    } catch (e) {
        next(e)
    }
})

authRouter.post('/register', ensureLoggedOut('register'), async ({body}, res, next) => {
    try {

        if (!body.password) throw new BadRequestError('Must provide a password')
        const user = await createUser({ ...body,role:STUDENT})
        const token = createToken(user.username, user.role,user._id.toString())
        res.json({token})
    } catch (e) {
        next(e)
    }
})
