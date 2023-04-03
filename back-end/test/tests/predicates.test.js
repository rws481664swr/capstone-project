import {should} from "chai";
import common, {c1, c2, cm1, cm3, p1, u1, u2} from "../common/seed-test-db.js";
import {
    postBelongsToCourse,
    postBelongsToUser,
    teacherCanPin,
    teacherOwns, userCanComment,
    userEnrolledIn
} from "../../middleware/predicates.js";
import {Courses} from "../../db/schemas/models.js";
import {faker} from "@faker-js/faker";
import {createPost} from "../../db/posts.js";

should()
describe('sandbox', () => {
    common()
    it('teacherOwns true', async () => {
        const teacher = u2.username
        const course = c2._id
        ;(await teacherOwns(teacher, course)).should.be.true
    })

    it('userEnrolledIn true', async () => {
        const teacher = u1.username
        const course = c1._id
        ;(await userEnrolledIn(teacher, course)).should.be.true
    })
    it('teacherOwns false', async () => {
        const teacher = u1.username
        const course = c2._id
        ;(await teacherOwns(teacher, course)).should.be.false
    })
    it('userEnrolledIn false', async () => {
        const teacher = u1.username
        const course = c2._id
        ;(await userEnrolledIn(teacher, course)).should.be.false
    })
    it('postBelongsToUser is true', async () => {
        const result = await postBelongsToUser(u1.username, p1._id.toString())
        result.should.be.true
    })
    it('postBelongsToUser is false', async () => {
        const result = await postBelongsToUser(u2.username, p1._id.toString())
        result.should.be.false
    })
    it('postBelongsToCourse is true', async () => {
        const result = await postBelongsToCourse(c1._id.toString(), p1._id.toString())
        result.should.be.true
    })
    it('postBelongsToCourse is false', async () => {
        const result = await postBelongsToCourse(c2._id.toString(), p1._id.toString())
        result.should.be.false
    })
    it('should determine whether a teacher can pin a post and find out they can',async()=>{
        const result = await teacherCanPin(u2.username, p1._id)
        result.should.be.true
    })
    it('should determine whether a teacher can pin a post and find out they can not',async()=>{
        const c3= await Courses.create({
            subject: 'subject3,',
            startDate: new Date(2020, 3, 22),
            endDate: new Date(2020, 5, 28),
            courseName: 'c3',
            courseNumber: faker.datatype.number()
        })
        const p4=await createPost({
            course: c3._id,
            title:'t',
            username:u1.username,
            user: u1._id,
            content: "content!",
            pinned: false,
            postDate: new Date()
        })
        const result = await teacherCanPin(u1.username, p4._id)
        result.should.be.false
    })
    it('user can comment on post',async()=>{
        (await userCanComment(u1.username,cm1._id)).should.be.true
    })
    it('user cannot comment on post',async()=>{
        (await userCanComment(u1.username,cm3._id)).should.be.false

    })
    it('user cam comment on multiple posts',async()=>{
        (await userCanComment(u2.username,cm3._id)).should.be.true;
        (await userCanComment(u2.username,cm3._id)).should.be.true;

    })
})