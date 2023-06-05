import {getUser} from "../db/users.js";
import {UnauthorizedError} from "../util/Errors.js";

const staleOrInvalidData = async (req, res, next) => {
    if (!res.locals.user) return next() // not logged in

    try {
        const {user: {_id, username}} = res.locals;
        const user = await getUser(username)
        if(!user)
        if (user._id.toString() !== _id)
            throw new UnauthorizedError('Stale or invalid data. Please log out/in and try again')
        next()
    } catch (e) {
        next(e)
    }
}


export default staleOrInvalidData
