import common, {c1, c2, requests, u1, u2} from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";
import {createCourse, getCourse, teachCourse} from "../../../db/courses.js";
import {jsonify} from "../../../db/util.js";
import {createUser} from "../../../db/users.js";
import {$u2} from "../../common/mock-data.js";


const should = chaiShould()

const prefix = (rest = '') => `http://localhost:${PORT}/courses/${rest}`
const newCourse = () => ({
    subject: 'english',
    endDate: new Date(),
    startDate: new Date(),
    courseName: 'course 3',
    courseNumber: 11031,
})

describe('courses middleware security', () => {
        common();
        it('should only be able to access own courses', async () => {
            let data, status;
            await createCourse(newCourse())
            ;({data, status} = await requests.get.student(prefix()))
            status.should.equal(200)
            data.should.eql(jsonify([c1]))
            ;({data, status} = await requests.get.teacher(prefix()))
            const courses = jsonify([c1, c2]).map(({_id}) => _id)
            const [a, b] = courses
            data = data.map(e => e._id.toString())
            data.should.include(a)
            data.should.include(b)
            status.should.equal(200)
        })

        it('should be able to create as teacher', async () => {

            const {data, status} = await requests.post.teacher(prefix(), newCourse())
            status.should.equal(201)
            data.should.have.property('subject').equal('english')
            data.should.have.property('courseName').equal('course 3')
            data.should.have.property('courseNumber').equal(11031)

        })
        it('should be able to create as admin', async () => {

            const {data, status} = await requests.post.admin(prefix(), newCourse())
            status.should.equal(201)
            data.should.have.property('subject').equal('english')
            data.should.have.property('courseName').equal('course 3')
            data.should.have.property('courseNumber').equal(11031)


        })
        it('should be NOT be able to create as student', async () => {
            try {
                await requests.post.student(prefix(), newCourse())
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }


        })
    /*
    * Currently by design there is no support for updating tests
    * These tests are for if it is decided that courses should be able
    * to be edited/updated.
    *
    * */    /*

    it('only teacher can update their course', async () => {

            const {data, status} = await requests.put.teacher(prefix(c2._id), {subject: 'none'})
            data.should.have.property('subject').equal('none')
            status.should.equal(200)
        })
        it('teacher cannot update another course', async () => {
            const c3 = await createCourse(newCourse())
            try {
                await requests.put.teacher(prefix(c3._id), {subject: 'none'})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('student can not update their course', async () => {
            try {
                await requests.put.student(prefix(c1._id), {subject: 'none'})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })*/

        it('cannot delete a course if student', async () => {
            try {
                await requests.delete.student(prefix(c1._id))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })
        it('teacher can delete own course', async () => {
            const {status, data} = await requests.delete.teacher(prefix(c2._id))
            status.should.equal(200)
            data.should.eql({message: 'deleted'})
            should.not.exist(await getCourse(c2._id.toString()))
        })
        it('teacher cannot delete a course if not a teacher of the course', async () => {
            const c3 = await createCourse(newCourse())
            try {
                await requests.delete.teacher(prefix(c3._id))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('should allow user to enroll in course', async () => {
            const {data, status} = await requests.post.student(prefix(`${c2._id}/users/${u1.username}`), {})
            status.should.equal(200)
            data.should.have.property('message').equal('enrolled')
        })
        it('should not allow user to enroll in course twice (bad request)', async () => {
            try {
                await requests.post.student(prefix(`${c1._id}/users/${u1.username}`), {})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(400)

            }
        })

        it('should not allow teacher to enroll in course', async () => {
            try {
                let c3 = await createCourse(newCourse())

                await requests.post.teacher(prefix(`${c3._id}/users/${u2.username}`), {})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)

            }

        })

        it('admin can add teacher to course', async () => {
            let c3 = await createCourse(newCourse())
            c3.teachers.length.should.equal(0)

            await requests.post.admin(prefix(`${c3._id}/users/${u2.username}`))
            c3 = await getCourse(c3._id)
            c3.teachers.length.should.equal(1)


        })
        it('teacher cannot add teacher to course', async () => {
            const c3 = await createCourse(newCourse())
            try {

                await requests.post.teacher(prefix(`${c3._id}/users/${u2._id}`))

                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }

        })
        it('student cannot add teacher to course', async () => {
            const c3 = await createCourse(newCourse())
            try {

                await requests.post.student(prefix(`${c3._id}/users/${u2.username}`))

                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('cannot remove teacher if only teacher', async () => {
            try {
                await requests.delete.teacher(prefix(`${c2._id}/users/${u2.username}`))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(401)
            }
        })
        it('admin can unenroll for student', async () => {
            const {status} = await requests.delete.admin(prefix(`${c1._id}/users/${u1.username}`))
            status.should.eq(200)
            const course = await getCourse(c1._id)
            course.students.should.have.length(0)
        })
        it('admin can remove teacher if not only teacher', async function ()  {
            this.timeout(9000)
            const u4 =
                await createUser({...$u2(), password:'password*',username: 'u4'})
            await teachCourse('u4', c2._id)
           const {status} = await requests.delete.admin(prefix(`${c2._id}/users/${u2.username}`))
            status.should.equal(200 )

        })
        it('student can unenroll', async () => {
            const {status} = await requests.delete.student(prefix(`${c1._id}/users/${u1.username}`))
            status.should.eq(200)
            const course = await getCourse(c1._id)
            course.students.should.have.length(0)
        })
        it('student cannot unenroll if not enrolled', async () => {
            try {
                await requests.delete.student(prefix(`${c2._id}/users/${u1.username}`))
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(400)
            }
        })

    }
)