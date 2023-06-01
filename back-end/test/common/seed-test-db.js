process.env.NODE_ENV='test'
import {Comments, Courses, Credentials, Posts, Users} from "../../db/schemas/models.js";
import {conn, startServer} from "../../app.js";
import {$c1, $c2, $p1, $p2, $p3, $u1, $u2, $u3} from "./mock-data.js";
import {hash} from "bcrypt";
import {disconnect} from 'mongoose'
import jwt from "jsonwebtoken";
import {SECRET_KEY,TEST_PORT} from "../../config.js";
import {createConfigToken} from "./tokens.js";
import axios from 'axios'
import {createRequests} from '../tests/middleware-security/requests.js'

export let requests,
    u1, u2
    , c1, c2
    , p1, p2, p3
    , c1c2, c2c1
    , cm1, cm2, cm3
    , cred1, cred2
    , adminToken, token, teacherToken
    , admin
    , tokenConfig
    , teacherTokenConfig
    , adminTokenConfig


const password = await hash('password', 1)
export const doBeforeAll = async function () {
    this.timeout(10000)
    this.server = await startServer(TEST_PORT)
    this.conn = conn
    try {
        await Posts.deleteMany({}).exec()
        await Courses.deleteMany({}).exec()
        await Users.deleteMany({}).exec();
        await Credentials.deleteMany({}).exec();
        await Comments.deleteMany({}).exec();
    } catch (e) {
        console.error('TEST BEFORE ALL ERROR', e)
        process.exit(1)
        throw e
    }
}

export const doBeforeEach = async function () {
    this.timeout(10000)
    try {
        u1 = await Users.create($u1())
        u2 = await Users.create($u2())
        admin = await Users.create($u3())

        token = jwt.sign(
            {
                username: 'u1',
                role: 'STUDENT',
                _id: u1._id.toString()
            }, SECRET_KEY)
        teacherToken = jwt.sign(
            {
                username: 'u2',
                role: 'TEACHER',
                _id: u2._id.toString()
            }, SECRET_KEY)
        adminToken = jwt.sign(
            {
                username: 'admin',
                role: 'ADMIN',
                _id: admin._id.toString()
            }, SECRET_KEY)
        tokenConfig = createConfigToken(token)
        teacherTokenConfig = createConfigToken(teacherToken)
        adminTokenConfig = createConfigToken(adminToken)

        requests= createRequests(axios)

        cred1 = await Credentials.create({username: 'u1', password})
        cred2 = await Credentials.create({username: 'u2', password})

        c1 = await Courses.create($c1())
        c2 = await Courses.create($c2())

        p1 = await Posts.create($p1(c1._id, u1._id, u1.username))
        p2 = await Posts.create($p2(c2._id, u2._id, u1.username))
        p3 = await Posts.create($p3(c1._id, u2._id, u2.username))

        ;[cm1, cm2, cm3] = await Promise.all([
            Comments.create({
                post: p1._id.toString(),
                username: 'u1',
                content: 'Test comment1',
                timestamp: new Date()
            }),
            Comments.create({
                post: p1._id.toString(),
                username: 'u2',
                content: 'Test comment2',
                timestamp: new Date(2011)
            }),
            Comments.create({
                post: p2._id.toString(),
                username: 'u2',
                content: 'Test comment3',
                timestamp: new Date(2011)
            })
        ])
        //create relationships
        await Promise.all([
            Courses.updateOne({_id: c1._id}, {$push: {students: u1._id}}),
            Courses.updateOne({_id: c1._id}, {$push: {teachers: u2._id}}),
            Courses.updateOne({_id: c2._id}, {$push: {teachers: u2._id}}),
            Users.updateOne({username: u1.username}, {$push: {courses: c1._id}}),
            Users.updateOne({username: u2.username}, {$push: {courses: c1._id}}),
            Users.updateOne({username: u2.username}, {$push: {courses: c2._id}}),
            Posts.updateOne({_id: p1._id}, {$push: {comments: {$each: [cm1._id, cm2._id]}}})
        ]);


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
    } catch (e) {
        console.log()
    }
}

export const doAfterEach = async function () {
    await Promise.all([
        Promise.resolve()
        , Credentials.deleteMany({}).exec()
        , Comments.deleteMany({}).exec()
        , Users.deleteMany({}).exec()
        , Courses.deleteMany({}).exec()
        , Posts.deleteMany({}).exec()
    ])
}
export const doAfterAll = async function () {

    await disconnect()
    await this.server.close()
}
const common = () => {
    before(doBeforeAll)
    beforeEach(doBeforeEach)
    afterEach(doAfterEach)
    after(doAfterAll)
}
export default common
