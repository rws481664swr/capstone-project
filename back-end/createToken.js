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