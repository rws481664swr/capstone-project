import jwt from "jsonwebtoken";
import {SECRET_KEY} from "./config.js";

export default function createToken(username, role,_id,rest={}) {
    return jwt.sign({
        username,
        role,
        _id,
        timestamp:Date.now(),
        ...rest
    },SECRET_KEY)
}
export const refreshToken=(token)=>{
    const {timestamp,...tokenData}=
        jwt.decode(token)
    return jwt.sign({
        ...tokenData,
        timestamp:Date.now()
    },SECRET_KEY)
}