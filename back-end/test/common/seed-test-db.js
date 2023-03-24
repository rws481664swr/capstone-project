import {Courses, Posts, Users} from "../../db/schemas/models.js";
import {newCourse} from "../../db/schemas/courses.js";
import {newUser} from "../../db/schemas/users.js";
import {newPost} from "../../db/schemas/posts.js";
import {conn, startServer} from "../../app.js";

export let u1, u2, c1, c2, p1, p2, p3
let connection, server
export const doBeforeAll = async function (){
    this.timeout(10000)
    // server = await startServer()
    this.server= await startServer()
    this.conn= conn
    await Posts.deleteMany({}).exec()
    await Courses.deleteMany({}).exec()
    await Users.deleteMany({}).exec();

}
export const doBeforeEach = async () => {


    ;[u1, u2, c1, c2] = await Promise.all([
        Users.create(newUser('u1', "STUDENT")),
        Users.create(newUser('u2', "TEACHER")),
        Courses.create(newCourse()),
        Courses.create(newCourse())
    ]);
    [p1, p2, p3] = await Promise.all([
        Posts.create(newPost(c1._id, u1._id, u1.username)),
        Posts.create(newPost(c2._id, u1._id, u1.username)),
        Posts.create(newPost(c1._id, u2._id, u2.username))
    ]);
    await Promise.all([
        Courses.updateOne({_id: c1._id}, {$push: {students: u1._id}}),
        Courses.updateOne({_id: c1._id}, {$push: {teachers: u2._id}}),
        Courses.updateOne({_id: c2._id}, {$push: {teachers: u2._id}}),
        Users.updateOne({username: u1.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c2._id}})
    ])
    ;[u1, u2, c1, c2, p1, p2, p3] = await Promise.all([
        Users.findOne({username: 'u1'}).exec(),
        Users.findOne({username: 'u2'}).exec(),

        Courses.findOne({_id: c1._id}).exec(),
        Courses.findOne({_id: c2._id}).exec(),

        Posts.findOne({_id: p1._id}).exec(),
        Posts.findOne({_id: p2._id}).exec(),
        Posts.findOne({_id: p3._id}).exec()
    ]);

}
export const doAfterEach = async function ()  {
    await Promise.all([Users, Courses, Posts]
        .map(model => model.deleteMany({}))
        .map(query => query.exec()))
}
export const doAfterAll = async function ()  {

    await this.conn.disconnect()
    await this.server.close()
}
const doAllHooks = () => {
    before(doBeforeAll)
    beforeEach(doBeforeEach)
    afterEach(doAfterEach)
    after(doAfterAll)
}
export default doAllHooks
