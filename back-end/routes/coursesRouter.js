import express from "express";
import {
    createCourse,
    deleteCourse, deleteCourseCascade,
    enrollCourse,
    getCourse, getCourses,
    teachCourse,
    unEnrollCourse,
    unTeachCourse
} from '../db/courses.js'
import {getUser} from "../db/users.js";
import {ensureLoggedIn, ensureTeacher} from "../middleware/authToken.js";
import {ADMIN, STUDENT, TEACHER} from "../util/roles.js";
import {BadRequestError, ForbiddenError, FourOhFourError} from "../util/Errors.js";


export const coursesRouter = express.Router()
coursesRouter.use(ensureLoggedIn)

coursesRouter.get('/', async ({query: {sort, direction}}, res, next) => {
    try {

        if(res.locals.user.role===ADMIN)  return res.json( await getCourses())

        const {courses}  = await getUser(res.locals.user.username, true)
        console.log('get c',res.getHeader('Authentication'))

        return res.json(courses)

    } catch (e) {
        next(e)
    }

})
coursesRouter.get('/:_id', async ({params: {_id}, query: {populate}}, res, next) => {
    try {

         const course = await getCourse(_id,
            Boolean(populate)
                ? {teachers: true, students: true}
                : {})
        if (course === null)
            throw new FourOhFourError('cannot find course')
        if (res.locals.user.role === ADMIN)
            return res.json(course)
        if (!course.hasMember(res.locals.user._id ) )
            throw new ForbiddenError('user is not a member of the course')
        return res.json(course)

    } catch (e) {
        next(e)
    }

})

coursesRouter.post('/', ensureLoggedIn, ensureTeacher, async ({body = {}}, res, next) => {
    try {
        const data = await createCourse(body)
        if(res.locals.user.role===TEACHER) await teachCourse(res.locals.user.username, data._id)
        res.status(201).json(data)
    } catch (e) {
        next(e)
    }
})

coursesRouter.delete('/:_id', ensureLoggedIn, ensureTeacher, async ({params: {_id}}, res, next) => {
    try {
        let deleted=false
        //short circuit to avoid extra db call
        if ( res.locals.user.role === ADMIN) {
            await deleteCourseCascade(_id)
            return res.json({message: 'deleted'})
        }

        const course = await getCourse(_id)
        if (course.hasMember(res.locals.user._id)  ) {
            await deleteCourseCascade(_id)
            return res.json({message: 'deleted'})
        }

        throw new ForbiddenError('Cannot delete course')
    } catch (e) {
        next(e)
    }
})

//enroll in course
coursesRouter.post('/:_id/users/:username', ensureLoggedIn, async ({params: {_id, username}}, res, next) => {
    try {
        const {locals:{user:{username:correctUsername,role}}} = res
        if (correctUsername !== username &&  role !== ADMIN)  throw new ForbiddenError('Cannot enroll others')
const userPromise = getUser(username)
        const coursePromise = getCourse(_id)

        const user = await userPromise
        const course = await coursePromise

        if (course.hasMember(user._id))
            throw new BadRequestError('User is already a member of course')
        switch (user.role) {
            case TEACHER:
                await teachCourse(user.username, _id, user.role)
                break

            case STUDENT:
                await enrollCourse(user.username, _id, user.role)

                break
            default:
                throw new BadRequestError('error')
        }
        res.json({message: 'enrolled'})

    } catch (e) {
        console.log(e)
        next(e)
    }
})

//unenroll
coursesRouter.delete('/:_id/users/:username', ensureLoggedIn, async ({params: {_id, username}, ...req}, res, next) => {

    const {role, _id: userid} = res.locals.user

    try {
        const course = await getCourse(_id)
        const user = await getUser(username)

        ;
        if (role !== ADMIN) {
            if (res.locals.user.username !== username) {
                if (role === STUDENT) throw new ForbiddenError("Students may not unenroll others")
            }


            //is a teacher in the course
            if ((role === TEACHER && course.hasMember(userid)) || role === ADMIN) {
                if (course.hasOneTeacher()) {
                    throw new ForbiddenError("Cannot remove only teacher")
                }
            } else if (role === STUDENT) {
                if (!course.hasMember(userid
                )) {
                    throw new BadRequestError()
                }
            }
        }
        switch (user.role) {

            case STUDENT:
                await unEnrollCourse(username, _id)
                break;
            case TEACHER:
                await unTeachCourse(username, _id)
                break;
            default: // can only be an admin
                throw new BadRequestError('Illegal user role')
        }

        res.json({message: 'unenrolled'})

    } catch (e) {
        next(e)
    }
})




