import {compare, hash} from 'bcrypt'
import {BCRYPT_WORK_FACTOR} from '../config.js'
import {Credentials} from "./schemas/models.js";



export const login = async (username, fromUser) => {
    const {password: fromDb} = await Credentials.findOne({username})
    return await compare(fromUser, fromDb)
}

export const signUp = async (username, rawPassword) => {
    const password = await hash(rawPassword, BCRYPT_WORK_FACTOR)
    await Credentials.create({username, password})
}
export const changePassword = async (username, _old,_new) => {
    const {password}= await Credentials.findOne({username})
    if(await compare(_old,password)){
        const password =hash(_new,BCRYPT_WORK_FACTOR)
    }
}
export const removeCredentials=(username)=>{
    return  Credentials.findOneAndDelete({username})
}