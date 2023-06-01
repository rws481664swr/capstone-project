import common, {c1, c2, p1, p2, p3, requests, u1, u2} from "../../common/seed-test-db.js";
import {should as chaiShould,expect} from "chai";
import {TEST_PORT as PORT} from "../../../config.js";
import {getCourse, unTeachCourse} from "../../../db/courses.js";
import {$p1} from "../../common/mock-data.js";
import {getPost, pinPost} from "../../../db/posts.js";

const should = chaiShould()

const prefix = (rest = '') => `http://localhost:${PORT}/posts/${rest}`
describe('posts middleware security', () => {
    describe('get', () => {
        common();

        it('get post by id if in course (student', async () => {
            const {data, status} = await requests.get.student(prefix(p1._id))
            status.should.equal(200)
            data._id.should.equal(p1._id.toString())

        })
        it('get post by id if teacher ', async () => {
            const {data, status} = await requests.get.teacher(prefix(p1._id))
            status.should.equal(200)
            data._id.should.equal(p1._id.toString())

        })
        it('get post by id if admin ', async () => {
            const {data, status} = await requests.get.admin(prefix(p1._id))
            status.should.equal(200)
            data._id.should.equal(p1._id.toString())
        })
        it('cannot get post by id if not a member (student) ', async () => {
            try {
                const {data, status} = await requests.get.student(prefix(p2._id))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })
        it('cannot get post by id if not a member (teacher) ', async () => {
            await unTeachCourse(u2.username, c1._id)
            const course = await getCourse(c1._id)
            course.teachers.should.have.length(0)

            try {
                const {data, status} = await requests.get.teacher(prefix(p1._id))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })


        it('can get posts in course if enrolled', async () => {
            const {data, status} = await requests.get.student(prefix(`courses/${c1._id}`))
            status.should.equal(200)
            data.should.have.length(2)
            const ids = data.map(({_id}) => _id)
            ;[p3, p1]
                .map(({_id}) => _id.toString())
                .forEach(e => ids.should.include(e))
        })
        it('can get posts in course if teaching ', async () => {
            const {data, status} = await requests.get.teacher(prefix(`courses/${c1._id}`))
            status.should.equal(200)

            data.should.have.length(2)
            const ids = data.map(({_id}) => _id)
            ;[p3, p1]
                .map(({_id}) => _id.toString())
                .forEach(e => ids.should.include(e))
        })
        it('can get posts in course if admin ', async () => {
            const {data, status} = await requests.get.admin(prefix(`courses/${c1._id}`))
            status.should.equal(200)
            data.should.have.length(2)
            const ids = data.map(({_id}) => _id)
            ;[p3, p1]
                .map(({_id}) => _id.toString())
                .forEach(e => ids.should.include(e))
        })


        it('cannot get posts from another course (student)', async () => {
            try {
                const {data, status} = await requests.get.student(prefix(`courses/${c2._id}`))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('cannot get posts from another course (teacher) ', async () => {
            await unTeachCourse(u2.username, c2._id)
            const course = await getCourse(c2._id)
            course.teachers.should.have.length(0)

            try {
                const {data, status} = await requests.get.teacher(prefix(`courses/${c2._id}`))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })
    })

    describe('create', () => {
        common();
        it('can create post if create post if in course (student)', async () => {
            const body = $p1(
                c1._id, u1._id, 'u1'
            )
            const {data, status} = await requests.post.student(prefix(), body)
            status.should.equal(201)
            data.should.have.property('username').equal('u1')
            data.should.have.property('title').equal(body.title)
            data.should.have.property('content').equal(body.content)
            data.should.have.property('pinned').equal(body.pinned)
        })
        it('can create post if create post if in course (teacher)', async () => {

            const body = $p1(
                c2._id, u2._id, 'u2'
            )
            const {data, status} = await requests.post.teacher(prefix(), body)
            status.should.equal(201)
            data.should.have.property('username').equal('u2')
            data.should.have.property('title').equal(body.title)
            data.should.have.property('content').equal(body.content)
            data.should.have.property('pinned').equal(body.pinned)
        })
        it('can create post if create post if in course or admin', async () => {
            const body = $p1(
                c2._id, u2._id, 'u2'
            )
            const {data, status} = await requests.post.admin(prefix(), body)
            status.should.equal(201)
            data.should.have.property('username').equal('admin')
            data.should.have.property('title').equal(body.title)
            data.should.have.property('content').equal(body.content)
            data.should.have.property('pinned').equal(body.pinned)
        })
        it('cannot create post if not in course (student)', async () => {
            const body = $p1(
                c2._id, u1._id, 'u1'
            )
            try {
                const {data, status} = await requests.post.student(prefix(), body)
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('cannot create post if not in course (teacher)', async () => {
            await unTeachCourse(u2.username, c2._id)
            const course = await getCourse(c2._id)
            course.teachers.should.have.length(0)

            const body = $p1(
                c2._id, u2._id, 'u2'
            )
            try {
                const {data, status} = await requests.post.teacher(prefix(), body)
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })
    })
    describe('update', () => {
        common();
        it('can update post if create post if owned', async () => {
            const {} = await requests.put.student(prefix(p1._id), {content: 'new content'})
            const post = await getPost(p1._id)
            post.content.should.equal('new content')
        })
        it('cannot update another users post', async () => {
            try {
                const {} = await requests.put.student(prefix(p3._id), {content: 'new content'})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
            try {
                const {} = await requests.put.teacher(prefix(p1._id), {content: 'new content'})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
    })


    describe('pins', () => {
        common();
        it('can pin if teacher', async () => {
            p1.pinned.should.be.false
            const {data,status} =await requests.put.teacher(prefix(`${p1._id}/pin`))
            data.message.should.equal('pinned!')
            status.should.equal(200)
            const post = await getPost(p1._id)
            post.pinned.should.be.true
        })

        it('can unpin if teacher', async () => {
            await pinPost(p1._id)
            let post = await getPost(p1._id)
           post.pinned.should.be.true

            const {data,status} =await requests.put.teacher(prefix(`${p1._id}/unpin` ))
            data.message.should.equal('unpinned!')
            status.should.equal(200)
            post = await getPost(p1._id)
            post.pinned.should.be.false
        })
        it('cannot pin if student ', async () => {
            try{
                await requests.put.student(prefix(`${p1._id}/pin`))
                should.fail('fail')
            }catch (e) {
e.message.should.not.equal('fail')
e.response.status.should.equal(401)
            }
        })

        it('cannot unpin if student', async () => {
            try{
                await requests.put.student(prefix(`${p1._id}/unpin`))
                should.fail('fail')
            }catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }        })
    })
    describe('delete', () => {
        common();
        it('can delete post if owner', async () => {
            await requests.delete.student(prefix(p1._id))
            const posts = await getPost(p1._id)
            expect(posts).to.be.null
        })
        it('can delete post if teacher of course', async () => {
            await requests.delete.teacher(prefix(p1._id))
            const posts = await getPost(p1._id)
            expect(posts).to.be.null
        })
        it('can delete post if admin', async () => {
            await requests.delete.admin(prefix(p1._id))
            const posts = await getPost(p1._id)
            expect(posts).to.be.null           })

        it('cannot delete post if not owner, teacher or admin', async () => {
            await requests.delete.student(prefix(p3._id))
            const post = await getPost(p3._id)
            expect(post).to.not.exist
        })

    })


})