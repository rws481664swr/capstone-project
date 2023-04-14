import common, {cm1, cm2, p1, p2, requests} from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";
import {Comments} from "../../../db/schemas/models.js";


const should = chaiShould()

const prefix = (rest = '') => `http://localhost:${PORT}/comments/${rest}`

describe('comments middleware security', () => {
    common();
    it('should have token associated with posts course', async () => {
        const {data} = await requests.get.student(prefix(p1._id))
        data.should.eql([cm2, cm1].map((e => JSON.parse(JSON.stringify(e.toJSON())))))
    })
    it('should not allow user not in course to view comments', async () => {
        try {
            const {data} = await requests.get.student(prefix(p2._id))
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
    })

    it('should not be able to post in course if not enrolled', async () => {
        try {
            await requests.post.student(prefix(), {post: p2._id, content: 'hello'})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)

        }
    })
    it('should be able to post in course if enrolled', async () => {
        const {data, status} = await requests.post.student(prefix(), {post: p1._id, content: 'hello'})
        data.should.have.property('_id')
        data.should.have.property('content').equal('hello')
        data.should.have.property('post').equal(p1._id.toString())
        status.should.equal(201)
    })

    it('update comment can be done by  admin', async () => {

        const {data, status} = await requests.put.admin(prefix(`${cm1._id}`), {content: 'asdf'})
        status.should.equal(200)
        data.should.have.property('content').equal('asdf')

    })
    it('update comment should be done by owner', async () => {
        const {data, status} = await requests.put.student(prefix(`${cm1._id}`), {content: 'asdf'})
        status.should.equal(200)
    })
    it('update comment should not be done by other', async () => {
        try {
            await requests.put.student(prefix(`${cm2._id}`), {content: 'asdf'})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.status.should.equal(401)
        }
    })

    it('should allow owner to delete comment', async () => {
        const{data,status}=    await requests.delete.student(prefix(cm1._id))
        const exists = await Comments.exists({_id:cm1._id})
        should.not.exist(exists)

        data.should.have.property('message').equal('deleted')
    })
    it('should allow admin to delete comment', async () => {
        const{data,status}=    await requests.delete.student(prefix(cm1._id))
        const exists = await Comments.exists({_id:cm1._id})
        should.not.exist(exists)

        data.should.have.property('message').equal('deleted')


    })
    it('should allow u teacher to delete comment in course', async () => {
        const{data}=    await requests.delete.teacher(prefix(cm1._id))
        const exists = await Comments.exists({_id:cm1._id})
        should.not.exist(exists)
        data.should.have.property('message').equal('deleted')
    })
})
