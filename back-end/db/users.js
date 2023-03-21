import {Users, Users as users} from "./schemas/models.js";

export const createUser = async (user) => {
    return await users.create(user)
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
    return await users.deleteOne({username}).exec()
}

