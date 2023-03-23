import {Courses, Posts, Users} from "../../db/schemas/models.js";
import {connect} from "../../db/db.js";
// let server = await startServer()
import {createRequire} from 'module'
import getData from './test-data-factory.js'

let c1, c2, p1, p2, p3, u1, u2
const require = createRequire(import.meta.url)

export async function initTestDB() {
    const conn = await connect()
    c1 = c2 = p1 = p2 = p3 = u1 = u2 = null
    ;({c1, c2, p1, p2, p3, u1, u2} = getData())

    ;[u1, u2, c1, c2] = /*await Promise.all(*/[
        await Users.create(u1),
        await Users.create(u2),
        await Courses.create(c1),
        await Courses.create(c2)
    ]/*)*/;
    u1.save()



        [p1, p2, p3] = [
        await Posts.create({...p1, course: c1._id, user: u1._id, username: u1.username}),
        await Posts.create({...p2, course: c2._id, user: u1._id, username: u1.username}),
        await Posts.create({...p3, course: c1._id, user: u2._id, username: u2.username})
    ]

    await Promise.all([
        Courses.updateOne({_id: c1._id}, {$push: {students: u1._id}}),
        Courses.updateOne({_id: c1._id}, {$push: {teachers: u2._id}}),
        Courses.updateOne({_id: c2._id}, {$push: {teachers: u2._id}}),
        Users.updateOne({username: u1.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c2._id}})
    ])

    ;[c1, c2, p1, p2, p3, u1, u2] = await Promise.all([
        Courses.findById(c1._id).exec(),
        Courses.findById(c2._id).exec(),
        Users.findById(u1._id).exec(),
        Users.findById(u2._id).exec(),
        Posts.findById(p1._id).exec(),
        Posts.findById(p2._id).exec(),
        Posts.findById(p3._id).exec()
    ])

    return {c1, c2, p1, p2, p3, u1, u2}

}

