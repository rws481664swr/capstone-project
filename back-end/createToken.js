import jwt from "jsonwebtoken";
import {SECRET_KEY} from "./config.js";

export default function createToken(username, role,rest={}) {
    return jwt.sign({
        username,
        role,
        timestamp:Date.now(),
        ...rest
    },SECRET_KEY)
}