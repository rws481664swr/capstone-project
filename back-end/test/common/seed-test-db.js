import {Courses, Posts, Users} from "../../db/schemas/models.js";
import {newCourse} from "../../db/schemas/courses.js";
import {newUser} from "../../db/schemas/users.js";
import {newPost} from "../../db/schemas/posts.js";
import {connect} from "../../db/db.js";

export let u1, u2, c1, c2, p1, p2, p3
let conn
export const doBeforeAll = async () => {
    conn = await connect()
    await Posts.deleteMany({}).exec()
    await Courses.deleteMany({}).exec()
    await Users.deleteMany({}).exec();
}
export const doBeforeEach = async () => {

    ;[u1, u2] = [
        await Users.create(newUser('u1', "STUDENT")),
        await Users.create(newUser('u2', "TEACHER"))
    ];
    [c1, c2] = [
        await Courses.create(newCourse()),
        await Courses.create(newCourse())
    ];
    [p1, p2, p3] = [
        await Posts.create(newPost(c1._id, u1.username)),
        await Posts.create(newPost(c2._id, u1.username)),
        await Posts.create(newPost(c1._id, u2.username))
    ];
    await Courses.updateOne({_id: c1._id}, {$push: {students: u1.username}})
    await Courses.updateOne({_id: c1._id}, {$push: {teachers: u2.username}})
    await Courses.updateOne({_id: c2._id}, {$push: {teachers: u2.username}})
    await Users.updateOne({username: u1.username}, {$push: {courses: c1._id}})
    await Users.updateOne({username: u2.username}, {$push: {courses: c1._id}})
    await Users.updateOne({username: u2.username}, {$push: {courses: c2._id}})

    ;[u1, u2] = [
        await Users.findOne({username: 'u1'}).exec(),
        await Users.findOne({username: 'u2'}).exec()
    ];
    [c1, c2] = [
        await Courses.findOne({_id: c1._id}).exec(),
        await Courses.findOne({_id: c2._id}).exec()
    ];
    [p1, p2, p3] = [
        await Posts.findOne({_id: p1._id}).exec(),
        await Posts.findOne({_id: p2._id}).exec(),
        await Posts.findOne({_id: p3._id}).exec()
    ];
}
export const doAfterEach = async () => {

    await Posts.deleteMany({}).exec()
    await Courses.deleteMany({}).exec()
    await Users.deleteMany({}).exec();

}
export const doAfterAll = async () => {

    await conn.disconnect()
}
const doAllHooks = () => {
    before(doBeforeAll)
    beforeEach(doBeforeEach)
    afterEach(doAfterEach)
    after(doAfterAll)
}
export default doAllHooks
