import {Users, Users as users} from "./schemas/models.js";
import {removeCredentials, signUp} from "./creds.js";
import {BadRequestError} from "../util/Errors.js";

export const createUser = async (_user) => {
    const {password,username,...user}=_user
    try{
        await signUp(username, password)
        return await users.create({username,...user})
    }catch (e) {
        if(e.message.includes('duplicate key error')){
            throw new BadRequestError(`username ${username} is taken`)
        }
        throw e
    }
}

export const getUsers = async ({username}={username:1},showCourses=false) => {
    let result = users.find({})
    if(showCourses) result=result.populate('courses')
    return await result.sort({username}).exec()
}

export const getUser = async (username, showCourses) => {
    let result = Users.findOne({username})
    if (showCourses) result = result.populate('courses')
    return await result.exec()
}


export const updateUser = async(username, update) => {
    return await users.findOneAndUpdate({username}, update).exec()
}


export const deleteUser =async (username) => {
    await removeCredentials(username)
    return await users.deleteOne({username}).exec()
}

