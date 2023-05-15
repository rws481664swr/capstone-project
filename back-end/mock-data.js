import {connect, Credentials} from "./db/db.js";
import {Comments as Comment, Courses as Course, Posts as Post, Users as User,} from "./db/schemas/models.js";
import {faker} from "@faker-js/faker";
import {ADMIN, STUDENT, TEACHER} from "./util/roles.js";
import {writeFileSync} from "fs";
import {createCourse, enrollCourse, teachCourse} from "./db/courses.js";
import {createUser as _createUser} from "./db/users.js";
import {

createPost as _createPost,
} from "./db/posts.js";

const connection = await connect();


await Credentials.deleteMany({}).exec();
await Comment.deleteMany({}).exec();
await Course.deleteMany({}).exec();
await Post.deleteMany({}).exec();
await User.deleteMany({}).exec();

const createComment = async (post, user) => {
    const comment = new Comment({
        post: post._id,
        username: user.username,
        content: faker.lorem.sentence(),
        timestamp: new Date(),
    });
    await comment.save();
    return comment;
};
const createPost = async (course, {_id:user,username}) => {
     return await
         _createPost({
        title: faker.lorem.sentence(),
        course,
        user,
        username,
        content: faker.lorem.paragraph(),
        pinned: false,
        postDate: faker.date.recent(10),
    });

};

const createUser =

    (role,
     username,
     first_name = faker.name.firstName(),
     last_name = faker.name.lastName()
    ) =>
    _createUser
    ({
        password: 'password',
        username,
        first_name,
        last_name,
        email: faker.internet.email(first_name, last_name),
        role,
    })
const createStudent = (username) => createUser(STUDENT, username)
const createTeacher = (username) => createUser(TEACHER, username)
const createAdmin = (username) => createUser(ADMIN, username)

let user = await createStudent( "user")
let student_2 = await createStudent( "student_2")
let student_3 = await createStudent( "student_3")
let teacher_1 = await createTeacher( "teacher_1")
let teacher_2 = await createTeacher( "teacher_2")
let admin = await createAdmin("admin")
let users = [
    user,
    student_2,
    student_3,
    teacher_1,
    teacher_2,
    admin,
]
console.log(user)
console.log(users)


let courses =await Promise.all( [
    {
        subject: "subject1",
        startDate: new Date(2020, 3, 20),
        endDate: new Date(2022, 3, 25),
        courseName: "c1",
        courseNumber: faker.datatype.number(),
    },
    {
        subject: "subject2",
        startDate: new Date(2020, 3, 20),
        endDate: new Date(2022, 3, 25),
        courseName: "c2",
        courseNumber: faker.datatype.number(),
    },
    {
        subject: "subject3",
        startDate: new Date(2020, 3, 20),
        endDate: new Date(2022, 3, 25),
        courseName: "c3",
        courseNumber: faker.datatype.number(),
    }
].map(c=>createCourse(c)))


const [
    course_1,
    course_2,
    course_3
]= courses

let student_1 = user;
const enroll = (s, c) => {
    return enrollCourse(s.username, c._id);
}


const addTeacher = (s, c) => teachCourse(s.username, c._id);
await enroll(user, course_1)
await enroll(student_1, course_3)

await enroll(student_2, course_2)
await enroll(student_3, course_3)
await addTeacher(teacher_1, course_1)
await addTeacher(teacher_2, course_2)
await addTeacher(teacher_1, course_3)
await addTeacher(teacher_2, course_3);

[user,
    student_2,
    student_3,
    teacher_1,
    teacher_2,
    admin] = await Promise.all([user,
    student_2,
    student_3,
    teacher_1,
    teacher_2,
    admin].map(u => User.findOne({username: u.username})))
student_1 = user;

let post_1 = await createPost(course_1._id, student_1),
    post_2 = await createPost(course_1._id, student_1),
    post_3 = await createPost(course_1._id, teacher_1),
    post_4 = await createPost(course_2._id, student_2),
    post_5 = await createPost(course_2._id, teacher_2),
    post_6 = await createPost(course_3._id, student_1),
    post_7 = await createPost(course_3._id, student_2);
const posts = [post_1, post_2, post_3, post_4, post_5, post_6, post_7];
let comment_1 = await createComment(post_1, student_1),
    comment_2 = await createComment(post_2, teacher_1),
    comment_3 = await createComment(post_2, student_1),
    comment_4 = await createComment(post_4, student_2),
    comment_5 = await createComment(post_4, teacher_2),
    comment_6 = await createComment(post_7, student_3),
    comment_7 = await createComment(post_6, teacher_1),
    comment_8 = await createComment(post_6, teacher_2);
const mapReduce = (arr) =>
    arr.map((e) => ({[e._id]: e})).reduce((e, r) => ({...e, ...r}));
const _teachers = mapReduce([teacher_1, teacher_2]);
const _students = mapReduce([student_1, student_2, student_3]);
const _users = mapReduce([
    admin,
    teacher_1,
    teacher_2,
    student_1,
    student_2,
    student_3,
]);


const _posts = mapReduce([
    post_1,
    post_2,
    post_3,
    post_4,
    post_5,
    post_6,
    post_7,
]);
const _courses = mapReduce([course_1, course_2, course_3]);
const _comments = mapReduce([
    comment_1,
    comment_2,
    comment_3,
    comment_4,
    comment_5,
    comment_6,
    comment_7,
    comment_8,
]);
const writeout = {
    teachers: _teachers,
    students: _students,
    admin,
    users: _users,
    courses: _courses,
    posts: _posts,
    comments: _comments,
    user: student_1,
    teacher: teacher_1,
};

writeFileSync("./file.json", JSON.stringify(writeout, null, 4));
await connection.disconnect();
