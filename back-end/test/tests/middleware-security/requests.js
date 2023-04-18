import _axios from 'axios'

import {adminTokenConfig, teacherTokenConfig, tokenConfig} from "../../common/seed-test-db.js";

const as = (axios, config)=>({
    get:async(url)=> await axios.get (url,config),
    post:async(url,body)=> await axios.post (url,body,config),
    put:async(url,body)=> await axios.put (url,body,config),
    delete:async(url)=> await axios.delete (url,config)
})
export const createRequests= (axios=_axios)=> {


    const asTeacher=(axios)=>
        as(axios,teacherTokenConfig)
    const asStudent=(axios)=>
        as(axios,tokenConfig)
    const asAdmin=(axios)=>
        as(axios, adminTokenConfig)

    const student = asStudent(axios)
    const teacher= asTeacher(axios)
    const admin = asAdmin(axios)
    return {

        get: {
            student: student.get,
            teacher:teacher.get,
            admin:admin.get
        },
        put: {
            student:student.put,
            teacher:teacher.put,
            admin:admin.put
        },
        post: {
            student:student.post,
            teacher:teacher.post,
            admin:admin.post
        },
        delete: {
            student:student.delete,
            teacher:teacher.delete,
            admin:admin.delete
        }
    }
}