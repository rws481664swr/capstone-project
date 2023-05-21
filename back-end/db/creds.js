import {compare, hash} from 'bcrypt'
import {BCRYPT_WORK_FACTOR} from '../config.js'
import {Credentials} from "./schemas/models.js";
import {BadRequestError, UnauthorizedError} from "../util/Errors.js";


export const login = async (username, fromUser) => {
    const result = await Credentials.findOne({username})
    if (result === null) throw {message: "User not found"}
    const {password: fromDb} = result
    return await compare(fromUser, fromDb)
}

export const signUp = async (username, rawPassword) => {

    if (rawPassword.length < 8) throw new BadRequestError("Password length should be >= 8")
    const password = await hash(rawPassword, BCRYPT_WORK_FACTOR)
    await Credentials.create({username, password})

}
export const changePassword = async (username, _old, _new) => {
    const auth=await Credentials.findOne({username}).exec()
    if(!auth) throw new Error("User not found")

    if (await compare(_old,  auth.password)) {
        const password = await hash(_new, BCRYPT_WORK_FACTOR)
        await Credentials.findOneAndUpdate({username}, {password})
    } else {
        throw new UnauthorizedError('Incorrect Password')
    }
}
export const removeCredentials = (username) => {
    return Credentials.findOneAndDelete({username})
}