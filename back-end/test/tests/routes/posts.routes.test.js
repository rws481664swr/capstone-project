import {should} from "chai";
import {
    adminToken, adminTokenConfig,
    c1,
    doAfterAll,
    doAfterEach,
    doBeforeAll,
    doBeforeEach,
    p1,
    teacherToken, teacherTokenConfig, token, tokenConfig,
    u1
} from "../../common/seed-test-db.js";
import axios from 'axios'
import {jsonify} from "../../../db/util.js";
import {Posts} from "../../../db/schemas/models.js";
import {PORT} from "../../../config.js";
import {getPost, pinPost} from "../../../db/posts.js";

const itShould = should()
const config = {
    headers: {authorization: `Bearer ${token}`}
}
const prefix = `http://localhost:${PORT}/posts`

describe('posts api routes', () => {
    before(doBeforeAll)
    beforeEach(doBeforeEach)
    afterEach(doAfterEach)
    after(doAfterAll)
    describe('GET', () => {
        it('/:id', async () => {
            const {data} = await axios.get(`${prefix}/${p1._id}`,tokenConfig)
            const expected = await Posts.findOne({_id: p1._id}).exec()
            data.should.eql(jsonify(expected))
        })
        it('/:id with course', async () => {
            const response = await axios.get(`${prefix}/${p1._id}?course=true`,tokenConfig)
            const {data} = response
            const json = await Posts.findOne({_id: p1._id}).populate('course').exec()
            const expected = jsonify(json)
            data.should.eql(expected)
        })
        it('/:id with user', async () => {
            const {data} = await axios.get(`${prefix}/${p1._id}?user=true`,tokenConfig)
            const response = await Posts.findOne({_id: p1._id}).populate('user').exec()
            const expected = jsonify(response)
            data.should.eql(expected)
        })
        it('/:id with course and user', async () => {
            const {data} = await axios.get(`${prefix}/${p1._id}?course=true&user=true`,tokenConfig)
            const expected = jsonify(await Posts
                .findById(p1._id)
                .populate('course')
                .populate('user')
                .exec())
            data.should.eql(expected)
        })
        it('/courses/:id', async () => {
            const {data} = await axios.get(`${prefix}/courses/${c1._id}`,tokenConfig)
            const expected = jsonify(await Posts.find({course: c1._id}).sort({postDate: -1}).exec())
            data.should.eql(expected)
        })
        it('/users/:username', async () => {
            const {data} = await axios.get(`${prefix}/users/${u1.username}`,tokenConfig)
            const expected = jsonify(
                await Posts
                    .find({user: u1._id})
                    .sort({postDate: -1})
                    .exec())
            data.should.eql(expected)
        })
    })
    describe('POST', () => {
        it('should create a post', async () => {
            const {_id: course} = c1
            const {_id: user, username} = u1
            const content = 'CONTENT'

            const body = {title:'title' ,course, username, user, content}
            const {data, status} = await axios.post(`${prefix}`, body,tokenConfig)

            status.should.equal(201)
            data.course.should.eql(course.toJSON())
            data.user.should.eql(user.toJSON())
            data.username.should.eql(username)
            data.content.should.eql(content)
            data.should.have.property('_id')
            const post = await Posts.findById(data._id).exec()
            data.should.eql(jsonify(post))
        })

        it('should not allow no content', async () => {
            const {_id: course} = c1
            const {_id: user, username} = u1
            const content = 'CONTENT'
            const body = {course, username, user, content: ''}

            try {
                await axios.post(`${prefix}`, body,tokenConfig)
                itShould.fail()
            } catch (e) {
                if (e.message.includes('fail()')) throw e
            }
        })
        it('should not allow undefined fields', async () => {
            const {_id: course} = c1
            const {_id: user, username} = u1
            const content = 'CONTENT'
            const body = {course, username, content}
            try {
                await axios.post(`${prefix}`, body,tokenConfig)
                itShould.fail()
            } catch (e) {
                if (e.message.includes('fail()')) throw e
            }
        })
    })
    describe('PUT', () => {
        it('should pin a post', async () => {
            const {_id} = p1
            await axios.put(`${prefix}/${_id}/pin`, {pinned: true},tokenConfig)
            ;(await getPost(_id)).pinned.should.be.true
        })
        it('should unpin a post', async () => {
            const {_id} = p1
            await pinPost(_id);
            ;(await getPost(_id)).pinned.should.be.true
            await axios.put(`${prefix}/${_id}/unpin`, {pinned: false},tokenConfig)
            ;(await getPost(_id)).pinned.should.be.false


        })
        it('should update the content of a post', async () => {
            const {_id} = p1
            const body = {content: 'hello world'}
            await axios.put(`${prefix}/${_id}`, body,tokenConfig)
            ;(await getPost(_id)).content.should.equal('hello world')
        })

    })



    /* todo add permissions (make sure the user deleting actually can delete it)*/
    describe('DELETE', () => {
        it('should delete a post as a student', async function () {
            await axios.delete(`${prefix}/${p1._id}`,tokenConfig)
            const posts = await Posts.find({_id: p1._id}).exec()
            posts.should.have.length(0)
            posts.should.not.deep.include(p1)
        })
        it('should delete a post as a teacher', async function () {
            await axios.delete(`${prefix}/${p1._id}`, teacherTokenConfig)
            const posts = await Posts.find({_id: p1._id}).exec()
            posts.should.have.length(0)
            posts.should.not.deep.include(p1)
        })
        it('should delete a post as an admin', async function () {
            await axios.delete(`${prefix}/${p1._id}`, adminTokenConfig)
            const posts = await Posts.find({_id: p1._id}).exec()
            posts.should.have.length(0)
            posts.should.not.deep.include(p1)
        })
    })
})