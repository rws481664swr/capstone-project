import common, {c1, c2, u1, u2} from '../../common/seed-test-db.js'
import {should as _should} from "chai";
import {
    createCourse,
    deleteCourse,
    enrollCourse,
    getCourse,
    getCourses,
    teachCourse,
    unEnrollCourse, unTeachCourse,
    updateCourse
} from "../../../db/courses.js";
import {Courses} from "../../../db/schemas/models.js";
import {jsonify} from "../../../db/util.js";
import {getUser} from "../../../db/users.js";

const should =_should()


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
        await updateCourse(c1._id, {courseName: 'c1_2'})
        const c = await Courses.findById(c1._id).exec()
        c.courseName.should.equal('c1_2')
    })
    it('should get Course', async () => {
        const course = await getCourse(c1._id)
        jsonify(course).should.eql(jsonify(c1))

    })
    it('should get Course With teachers', async () => {
        const course = await getCourse(c1._id, {students: true})
        jsonify(course).should.eql({...jsonify(c1), students: [jsonify(u1)]})

    })
    it('should get Course With students', async () => {
        const course = await getCourse(c1._id, {teachers: true})
        jsonify(course).should.eql({...jsonify(c1), teachers: [jsonify(u2)]})

    })
    it('should get Course With all', async () => {
        const course = await getCourse(c1._id, {teachers: true, students: true})
        jsonify(course).should.eql({
            ...jsonify(c1),
            students: [jsonify(u1)],
            teachers: [jsonify(u2)]
        })

    })
    it('should get all Courses', async () => {
        const courses = await getCourses()
        jsonify(courses).should.eql(jsonify([c1, c2]))

    })
    it('should get all Courses sorted by start date', async () => {
        const courses = await getCourses({startDate: 1})
        const expected = jsonify([c1, c2])

        jsonify(courses).should.eql(expected)

    })
    it('should get all Courses sorted by start date reverse', async () => {
        const courses = await getCourses({startDate: -1})
        const expected = jsonify([c2, c1])
        jsonify(courses).should.eql(expected)

    })
    it('should get all Courses sorted by name', async () => {
        const courses = await getCourses({courseName: 1})
        const expected = jsonify([c1, c2])

        jsonify(courses).should.eql(expected)

    })

    it('should get all Courses sorted by name reverse', async () => {
        const courses = await getCourses({courseName: -1})
        const expected = jsonify([c2, c1])

        jsonify(courses).should.eql(expected)

    })
    it('should get all Courses sorted by subject', async () => {
        const courses = await getCourses({subject: 1})
        const expected = jsonify([c1, c2])

        jsonify(courses).should.eql(expected)

    })

    it('should get all Courses sorted by subject reverse', async () => {
        const courses = await getCourses({subject: -1})
        const expected = jsonify([c2, c1])

        jsonify(courses).should.eql(expected)

    })


    it('should delete a Course', async () => {
        await deleteCourse(c1._id)
        const c1Prime = await Courses.find({_id: c1._id}).exec()
        c1Prime.should.eql([])


    })
    it('should add a teacher to Course', async () => {

        const c3 = jsonify(await Courses.create({
            courseName: 'c3',
            courseNumber: 33,
            endDate: new Date(),
            startDate: new Date(2020, 5, 20),
            subject: 'subj3'
        }))
        await teachCourse(u2.username, c3._id)

        const teachers = jsonify(await Courses.findById(c3._id).exec())
        jsonify(teachers).should.include(u2._id)
        const user = await getUser(u2.username, true)

        const userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.include(jsonify(c3)._id)
    })
    it('should enroll a student in a Course', async () => {
        await enrollCourse(u1.username, c2._id)

        const students = jsonify(await Courses.findById(c2._id).exec())
        jsonify(students).should.include(u1._id)
        const user = await getUser(u1.username, true)

        const userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.include(jsonify(c2)._id)
    })
    it('should un-enroll a student from a Course', async () => {
        await enrollCourse(u1.username, c2._id)
        let userCourses, user

        const students = jsonify(await Courses.findById(c2._id).exec())
        jsonify(students).should.include(u1._id)
        user = await getUser(u1.username, true)

        userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.include(jsonify(c2)._id)
        try {
            await unEnrollCourse(u1.username, c2._id)
        } catch (e) {
            console.log(e)
        }
        user = await getUser(u1.username, true)

        userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.not.include(jsonify(c2)._id)
        userCourses.should.eql(jsonify([c1._id]))

    })
    it('should remove a teacher from a Course', async () => {
        let userCourses, user

        const students = jsonify(await Courses.findById(c2._id).exec())
        jsonify(students).should.include(u2._id)
        user = await getUser(u2.username, true)

        userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.include(jsonify(c2)._id)
        await unTeachCourse(u2.username, c2._id)

        user = await getUser(u2.username, true)

        userCourses = jsonify(user).courses.map(({_id}) => _id)
        userCourses.should.not.include(jsonify(c2)._id)
        userCourses.should.eql(jsonify([c1._id]))

    })
})