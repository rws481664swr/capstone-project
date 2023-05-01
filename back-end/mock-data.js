import {connect, Credentials} from './db/db.js'
import {Comments as Comment, Courses as Course, Posts as Post, Users as User} from './db/schemas/models.js'
import {faker} from "@faker-js/faker";
import {STUDENT, TEACHER} from "./util/roles.js";
import {writeFileSync} from 'fs'
import {hashSync} from 'bcrypt'
import {enrollCourse, teachCourse} from "./db/courses.js";

const connection = await connect()
const save = e => e.save()
const toString = e => e.toString()
const saveAll = async (...all) => {
    await Promise.all(all)
}
await Credentials.deleteMany({}).exec()
await Comment.deleteMany({}).exec()
await Course.deleteMany({}).exec()
await Post.deleteMany({}).exec()
await User.deleteMany({}).exec()

const createComment = async (post, user) => {
    const comment = new Comment({
        post: post._id,
        username: user.username,
        content: faker.lorem.sentence(),
        timestamp: new Date()
    })
    await comment.save()
    return comment
}
const createPost = (course, user) => {
    const post = new Post({
        title: faker.lorem.sentence(),
        course,
        user: user._id,
        username: user.username,
        content: faker.lorem.paragraph(),
        pinned: false,
        postDate: faker.date.recent(10),
    })
    post.save()
    return post
}
const createUser = (role = STUDENT, username) => {
    const first_name = faker.name.firstName()
    const last_name = faker.name.lastName()
    const user = User({
        username: username || faker.internet.userName(first_name),
        first_name,
        last_name,
        email: faker.internet.email(first_name, last_name),
        role
    })
    user.save()
    return user
}
let student_1 = createUser(STUDENT, 'user')
    , student_2 = createUser(STUDENT, 'student_2')
    , student_3 = createUser(STUDENT, 'student_3')
    , teacher_1 = createUser(TEACHER, 'teacher_1')
    , teacher_2 = createUser(TEACHER, 'teacher_2')
    , admin = new User({
    username: 'admin',
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    role: "ADMIN"
})
admin.save()
const users = [
    student_1
    , student_2
    , student_3
    , teacher_1
    , teacher_2
    , admin]
const password = hashSync('password', 1)
;await Promise.all([student_1
    , student_2
    , student_3
    , teacher_1
    , teacher_2
    , admin].map(async user => Credentials.create({username: user.username, password}))
)


await saveAll(users)

let course_1 = new Course({
    subject: 'subject1',
    startDate: new Date(2020, 3, 20),
    endDate: new Date(2022, 3, 25),
    courseName: 'c1',
    courseNumber: faker.datatype.number()
})
    , course_2 = new Course({
    subject: 'subject2',
    startDate: new Date(2020, 3, 20),
    endDate: new Date(2022, 3, 25),
    courseName: 'c2',
    courseNumber: faker.datatype.number()
})
    , course_3 = new Course({
    subject: 'subject3',
    startDate: new Date(2020, 3, 20),
    endDate: new Date(2022, 3, 25),
    courseName: 'c3',
    courseNumber: faker.datatype.number()
})
course_1.save()
course_2.save()
course_3.save()
const courses = [course_1, course_2, course_3]
await saveAll(...courses)

const enroll = (s, c) => enrollCourse(s.username, c._id)
// course_1.students.push(student_1._id)
// student_1.courses.push(course_1._id)
const addTeacher = (s, c) => teachCourse(s.username, c._id)
await Promise.all([
    enroll(student_1, course_1),
    enroll(student_2, course_2),
    enroll(student_1, course_3),
    enroll(student_3, course_3),
    addTeacher(teacher_1, course_1),
    addTeacher(teacher_2, course_2),
    addTeacher(teacher_1, course_3),
    addTeacher(teacher_2, course_3)]
)


// course_1.teachers.push(teacher_1._id)
// teacher_1.courses.push(course_1._id)


// course_2.teachers.push(teacher_2._id)
// teacher_2.courses.push(course_2._id)

// course_3.teachers.push(teacher_1._id)
// teacher_1.courses.push(course_3._id)

// course_3.teachers.push(teacher_2._id)
// teacher_2.courses.push(course_3._id)


await saveAll([...users, ...courses])
let
    post_1 = await createPost(course_1._id, student_1)

    , post_2 = await createPost(course_1._id, student_1)

    , post_3 = await createPost(course_1._id, teacher_1)

    , post_4 = await createPost(course_2._id, student_2)

    , post_5 = await createPost(course_2._id, teacher_2)

    , post_6 = await createPost(course_3._id, student_1)

    , post_7 = await createPost(course_3._id, student_2)
const posts = [
    post_1, post_2, post_3, post_4, post_5, post_6, post_7
]
let

    comment_1 = await createComment(post_1, student_1)
    , comment_2 = await createComment(post_2, teacher_1)
    , comment_3 = await createComment(post_2, student_1)
    , comment_4 = await createComment(post_4, student_2)
    , comment_5 = await createComment(post_4, teacher_2)
    , comment_6 = await createComment(post_7, student_3)
    , comment_7 = await createComment(post_6, teacher_1)
    , comment_8 = await createComment(post_6, teacher_2)
const mapReduce = (arr) => arr.map(e => ({[e._id]: e}))
    .reduce((e, r) => ({...e, ...r}))
const _teachers = mapReduce([
    teacher_1, teacher_2
])
const _students = mapReduce([
    student_1, student_2, student_3
])
const _users = mapReduce([
    admin, teacher_1,
    teacher_2, student_1,
    student_2, student_3])
const _posts = mapReduce([post_1,
    post_2, post_3,
    post_4, post_5,
    post_6, post_7])
const _courses = mapReduce([
    course_1, course_2, course_3]
)
const _comments = mapReduce([
    comment_1, comment_2, comment_3, comment_4,
    comment_5, comment_6, comment_7, comment_8
])
const writeout = {
    teachers: _teachers,
    students: _students,
    admin,
    users: _users,
    courses: _courses,
    posts: _posts,
    comments: _comments,
    user: student_1,
    teacher: teacher_1
}


writeFileSync('./file.json',
    JSON.stringify(
        writeout,
        null, 4))
await connection.disconnect()