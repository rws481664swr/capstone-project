import jwt from "jsonwebtoken";
import {SECRET_KEY} from '../config.js'
import {ForbiddenError, UnauthorizedError} from "../util/Errors.js";
import {isAdmin,isTeacher, isLoggedIn, isStudent} from './predicates.js'
/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

export default function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        /* c8 ignore next */
        return next();
    }
}



/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

export function ensureLoggedIn(req, res, next) {
    try {
        if (!isLoggedIn(res)) throw new UnauthorizedError("Must be logged in");
        return next();
    } catch (err) {
        return next(err);
    }
}


/**
 * middleware to determine if user is admin.
 * Redirects to proper location upon determining role.
 */
export function ensureAdmin(req, res, next) {
    try {
        if (!isLoggedIn(res) || !isAdmin(res)) throw new UnauthorizedError('Must be an administrator');
        return next();
    } catch (err) {
        return next(err);
    }
}


/**
 * middleware to determine if user has teacher privileges (or admin).
 * Redirects to proper location upon determining role.
 */
export function ensureTeacher(req, res, next) {
    try {
        const validUser=isTeacher(res)||isAdmin(res)
        if (!isLoggedIn(res) || !validUser) throw new UnauthorizedError('Must be a teacher');
        return next();
    } catch (err) {
        return next(err);
    }
}


