import {PORT} from "../../../config.js";
import axios from "axios";
import {jsonify} from "../../../db/util.js";
import {should} from "chai";
import {getUser} from '../../../db/users.js'
import {c1, c2 , default as common} from "../../common/seed-test-db.js";
import {getCourses} from "../../../db/courses.js";
import {token} from "../../common/tokens.js";
should()
const prefix = `http://localhost:${PORT}`

describe('Courses routes', () => {
    common()


    describe('GET /courses', () => {




        it('should GET /courses', async () => {
            const courses = jsonify((await axios.get(`${prefix}/courses?sort=date&direction=desc`, {headers: {authorization:token}})).data)
        courses.should.eql(jsonify([c1]))
        })

    })
    describe('POST /courses', () => {

        it('should ', async () => {
            const body = {
                subject: 'english',
                endDate: new Date(),
                startDate: new Date(2020),
                courseName: 'course 3',
                courseNumber: 11031,
            }
            let {data}= await axios.post(`${prefix}/courses`,body)
            let {_id,__v,students,teachers,...rest} =jsonify(data);
            _id.should.not.be.null
            students.should.eql([])
            teachers.should.eql([])
            console.log( rest)
        })

    })

    describe('DELETE /courses', () => {

        it('should ', async () => {
            await axios.delete(`${prefix}/courses/${c1._id}`)
            const courses = await getCourses()
            courses.map(({_id})=>_id).should.not.include(jsonify(c1)._id)
        })

    })
    describe('enroll/unenroll',()=>{
        it('POST /:id/users/:username',async ()=>{})
        it('DELETE /:id/users/:username',async ()=>{})
    })
})