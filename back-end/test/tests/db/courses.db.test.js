// import {createCourse, getCourse, getCourses, updateCourse} from "../courses.js";
import * as data from '../../common/seed-test-db.js'
import {Courses, Posts, Users} from "../../../db/schemas/models.js";
import {newUser} from "../../../db/schemas/users.js";
import {newCourse} from "../../../db/schemas/courses.js";
import {newPost} from "../../../db/schemas/posts.js";
import {should} from "chai";
import common,{doAfterEach, doAfterAll, doBeforeAll, doBeforeEach, c1} from "../../common/seed-test-db.js";
import {getCourse} from "../../../db/courses.js";

should()
// before(doBeforeAll)
// beforeEach(doBeforeEach)
// afterEach(doAfterEach)
// after(doAfterAll)

describe('test courses queries', () => {
    common()

    it('should create a Course', () => {
        console.log()
        // // createCourse()
    })
    it('should update a Course', () => {
        // updateCourse()
    })
    it('should get Course', async () => {
        // console.log('starting teset')
        // const course = await getCourse({_id:c1}).exec()
        // console.log(c1)
        // expect(course).toEqual(c1)
    })
    it('should get all Courses', () => {
        // getCourses()
    })
    it('should delete a Course', () => {
    })
    it('should add a teacher to Course', () => {
    })
    it('should enroll a student in a Course', () => {
    })
})