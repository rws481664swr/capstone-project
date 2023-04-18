import common, {c1, c2, requests, u1} from "../../common/seed-test-db.js";
import {should as chaiShould,expect} from "chai";
import {PORT} from "../../../config.js";
import {getUser} from "../../../db/users.js";
import axios from "axios";

const should = chaiShould()

const _prefix = (rest = '') => `http://localhost:${PORT}/${rest}`
const prefix = (rest = '') => `http://localhost:${PORT}/users/${rest}`
describe('users middleware security', () => {
    common();
    it('only admin can get all users', async () => {
        try {
            await requests.get.student(prefix())
            should.fail('fail')
        } catch (e) {
            e.should.not.equal('fail')
        }
        try {
            await requests.get.teacher(prefix())
            should.fail('fail')
        } catch (e) {
            e.should.not.equal('fail')
        }
    })
    it('admin can get user', async () => {
        const {data: _u1, status} = await requests.get.admin(prefix('u1'))
        status.should.equal(200)
        _u1._id.should.equal(u1.getID())
    })

    it('user can get themself', async () => {
        const {data: _u1, status} = await requests.get.student(prefix('u1'))
        status.should.equal(200)
        _u1._id.should.equal(u1.getID())
    })
    it('student cannot get other user', async () => {
        try {
            await requests.get.student(prefix('u2'))
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
        }


    })
    it('student/teacher can get their courses', async () => {
        let user;

        ({data: user} = await requests.get.student(prefix('u1/courses')))
        user.courses.map(({_id})=>_id).should.include(c1.getID())

        ;({data: user} = await requests.get.teacher(prefix('u2/courses')))
        user.courses.map(({_id})=>_id).should.include(c1.getID())
        user.courses.map(({_id})=>_id).should.include(c2.getID())

    })
    it('student/teacher cannot get others get their courses', async () => {
        try {
            await requests.get.student(prefix('u2/courses'))
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
        try {
            await requests.get.teacher(prefix('u1/courses'))
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
    })
    it('user can update self', async () => {
        const [first_name,last_name]=['$first','$last']
        await requests.put.student(prefix('u1'),{first_name, last_name})
        const user= await getUser('u1')
        user.should.have.property('first_name').equal(first_name)
        user.should.have.property('last_name').equal( last_name)
    })
    it('admin can update other users', async () => {
        const [first_name,last_name]=['$first','$last']
        await requests.put.admin(prefix('u1'),{first_name, last_name})
        const user= await getUser('u1')
        user.should.have.property('first_name').equal(first_name)
        user.should.have.property('last_name').equal(last_name)
    })
    it('non-admin cannot update other', async () => {
        try {
            await requests.put.teacher(prefix('u1/'),{})
            should.fail('fail')
            e.response.status.should.equal(401)

        } catch (e) {
            e.message.should.not.equal('fail')
        }
    })
    it('only user can change password', async function ()  {

        this.timeout(10000)
        try {

            await requests.put.teacher(prefix('u1/password'),{password:'12345678',old:'password'})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
            await requests.put.student(prefix('u1/password'),{password:'12345678',old:'password'})

        const {data}=await axios.post(_prefix(`auth/login`),{username:'u1',password:'12345678'})
        data.token.should.exist
    })
    it('admin can change any password', async function ()  {
        this.timeout(10000)

        await requests.put.admin(prefix('u1/password'),{password:'12345678',old:'password'})

        const {data}=await axios.post(_prefix(`auth/login`),{username:'u1',password:'12345678'})
        data.token.should.exist
    })
    it('non-admin cannot POST to users', async () => {
        try {

            await requests.post.teacher(prefix(),{})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
    })
    it('user can delete themself', async () => {
const{data,status}=        await requests.delete.student(prefix('u1/'),{})
        status.should.equal(200)
        data.should.have.property('message').equal('deleted')
        expect(await getUser('u1')).to.not.exist
    })
    it('admin can delete user', async () => {
const{data,status}=        await requests.delete.admin(prefix('u1/'),{})
        status.should.equal(200)
        data.should.have.property('message').equal('deleted')
        expect(await getUser('u1')).to.not.exist
    })
    it('others cannot delete user', async () => {
        try {
            await requests.delete.teacher(prefix('u1/'),{})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)

        }
    })

})