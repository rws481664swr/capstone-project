import {Courses, Credentials, Posts, Users} from "../../db/schemas/models.js";
import {conn, startServer} from "../../app.js";
import {$c1, $c2, $p1, $p2, $p3, $u1, $u2} from "./mock-data.js";
import {hash} from "bcrypt";

export let u1, u2, c1, c2, p1, p2, p3, c1c2, c2c1
export let cred1, cred2
const password = await hash('password', 1 )
export const doBeforeAll = async function () {
    this.timeout(10000)
    this.server = await startServer()
    this.conn = conn
    await Posts.deleteMany({}).exec()
    await Courses.deleteMany({}).exec()
    await Users.deleteMany({}).exec();
    await Credentials.deleteMany({}).exec();
}
export const doBeforeEach = async function() {
    this.timeout(10000)
    u1 = await Users.create($u1())
    u2 = await Users.create($u2())

    cred1 = await Credentials.create({username: 'u1', password})
    cred2 = await Credentials.create({username: 'u2', password})

    c1 = await Courses.create($c1())
    c2 = await Courses.create($c2())

    p1 = await Posts.create($p1(c1._id, u1._id, u1.username))
    p2 = await Posts.create($p2(c2._id, u1._id, u1.username))
    p3 = await Posts.create($p3(c1._id, u2._id, u2.username))

    //create relationships
    await Promise.all([
        Courses.updateOne({_id: c1._id}, {$push: {students: u1._id}}),
        Courses.updateOne({_id: c1._id}, {$push: {teachers: u2._id}}),
        Courses.updateOne({_id: c2._id}, {$push: {teachers: u2._id}}),
        Users.updateOne({username: u1.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c1._id}}),
        Users.updateOne({username: u2.username}, {$push: {courses: c2._id}})
    ])

    //get all with ids
    ;[u1, u2, c1, c2, p1, p2, p3] = await Promise.all([
        Users.findOne({username: 'u1'}).exec(),
        Users.findOne({username: 'u2'}).exec(),

        Courses.findOne({_id: c1._id}).exec(),
        Courses.findOne({_id: c2._id}).exec(),

        Posts.findOne({_id: p1._id}).exec(),
        Posts.findOne({_id: p2._id}).exec(),
        Posts.findOne({_id: p3._id}).exec()
    ]);
    [c1c2, c2c1] = [[c1, c2], [c2, c1]];

}
export const doAfterEach = async function () {
    await Promise.all([Users, Courses, Posts, Credentials]
        .map(model => model.deleteMany({}))
        .map(query => query.exec()))
}
export const doAfterAll = async function () {

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
