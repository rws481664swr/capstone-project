import {TEST_PORT as PORT} from "../../../config.js";
import axios from "axios";
import {jsonify} from "../../../db/util.js";
import {should as chaiShould} from "chai";
import {getUser} from '../../../db/users.js'
import {c1, c2, default as common, teacherTokenConfig, token, tokenConfig, u1, u2} from "../../common/seed-test-db.js";
import {getCourse, getCourses} from "../../../db/courses.js";
const should = chaiShould()
const prefix = `http://localhost:${PORT}`

describe('Courses routes', () => {
    common()


    describe('GET /courses', () => {


        it('should GET /courses', async () => {
            const courses = jsonify((await axios.get(`${prefix}/courses?sort=date&direction=desc`, tokenConfig)).data)
        courses.should.eql(jsonify([c1]))
        })
        it('should fail GET /courses no token', async () => {
          try  {
                const courses = jsonify((await axios.get(`${prefix}/courses?sort=date&direction=desc`)).data)
                should.fail('fail')
            }catch (e) {
              e.message.should.not.eql('fail')

              e.response.status.should.eql(401)
          }
        })

    })
    describe('POST /courses', () => {

        it('should create a new course', async () => {
            const body = {
                subject: 'english',
                endDate: new Date(),
                startDate: new Date(2020),
                courseName: 'course 3',
                courseNumber: 11031,
            }
            let {data}= await axios.post(`${prefix}/courses`,body, teacherTokenConfig)
            let {_id,__v,students,teachers,...rest} =jsonify(data);
            _id.should.not.be.null
            students.should.eql([])
            teachers.should.eql([])
        })
        it('should fail if student tries to create course', async () => {
            const body = {
                subject: 'english',
                endDate: new Date(),
                startDate: new Date(2020),
                courseName: 'course 3',
                courseNumber: 11031,
            }
            try{
                await axios.post(`${prefix}/courses`, body, tokenConfig)
                should.fail('fail')
            }catch (e) {
                e.message.should.not.equal('fail')
            }
        })

    })

    describe('DELETE /courses', () => {

        it('should delete a course', async () => {
            await axios.delete(`${prefix}/courses/${c1._id}`, teacherTokenConfig)
            const courses = await getCourses()
            courses.map(({_id})=>_id).should.not.include(jsonify(c1)._id)
        })
        it('should fail to delete a course', async () => {
            try {
                await axios.delete(`${prefix}/courses/${c1._id}`, tokenConfig)
                should.fail('fail')
            }catch ({message}) {
                message.should.not.equal('fail')
            }
        })
        it('should fail if student tries to delete course', async () => {
            try{
                await axios.delete(`${prefix}/courses/${c1._id}`, tokenConfig)
                should.fail('fail')
            }catch (e) {
                e.message.should.not.equal('fail')
            }
        })



    })
    describe('enroll/unenroll',()=>{
        it('POST /:id/users/:username',async ()=>{
            const {username}=u1
            await axios.post(`${prefix}/courses/${c2._id}/users/${username}`,{}, tokenConfig)
            const user =await  getUser(username)
            const course=await  getCourse(c2._id)
            jsonify(course.students).should.include(jsonify(u1)._id)
            jsonify(user.courses).should.include(jsonify(c2)._id)
        })
        it('DELETE /:id/users/:username',async ()=>{
            const {username}=u1

            const {data}= await axios.delete(`${prefix}/courses/${c1._id}/users/${username}`,tokenConfig)
            data.message.should.eql('unenrolled')
            const user =await  getUser(username)
            const course=await  getCourse(c1._id)
            jsonify(course.students).should.not.include(jsonify(u1)._id)
            jsonify(user.courses).should.not.include(jsonify(c1)._id)
        })
    })
})