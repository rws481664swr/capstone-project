import common from '../../common/seed-test-db.js'
import {should} from "chai";
import {createCourse} from "../../../db/courses.js";
import {Courses} from "../../../db/schemas/models.js";
import {jsonify} from "../../../db/util.js";

should()
// before(doBeforeAll)
// beforeEach(doBeforeEach)
// afterEach(doAfterEach)
// after(doAfterAll)

describe('test courses queries', () => {
    common()

    it('should create a Course', async () => {
        let d1 = new Date()
        const c3 = await createCourse(
            {
                subject: 'english',
                endDate: new Date(),
                startDate: d1,
                courseName: 'course 3',
                courseNumber: 11031,
            })
        const course = await Courses.findById(c3._id).exec()
        jsonify(c3).should.eql(jsonify(course))
    })

    it('should update a Course', async () => {
        // updateCourse()
    })
    it('should get Course', async () => {
        // console.log('starting teset')
        // const course = await getCourse({_id:c1}).exec()
        // console.log(c1)
        // expect(course).toEqual(c1)
    })
    it('should get all Courses', async () => {
        // getCourses() TODO ADD VARIANTS

    })
    it('should delete a Course', async () => {

    })
    it('should add a teacher to Course', async () => {

    })
    it('should enroll a student in a Course', async () => {
        ;
    })
})