import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config.js";

export const token = jwt.sign({username:'u1',userType:'STUDENT'},SECRET_KEY)
export const teacherToken = jwt.sign({username:'u2',userType:'TEACHER'},SECRET_KEY)