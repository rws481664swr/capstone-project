import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config.js";

export function createConfigToken(token) {
    const config = {
        headers: {authorization: `Bearer ${token}`}
    }
    return config
}


export const token = jwt.sign({username:'u1',role:'STUDENT'},SECRET_KEY)
export const teacherToken = jwt.sign({username:'u2',role:'TEACHER'},SECRET_KEY)
export const adminToken = jwt.sign({username:'admin',role:'ADMIN'},SECRET_KEY)
export const tokenConfig = createConfigToken(token)
export const teacherTokenConfig = createConfigToken(teacherToken)
export const adminTokenConfig =  createConfigToken(adminToken)