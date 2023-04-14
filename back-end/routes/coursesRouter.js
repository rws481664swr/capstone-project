import express from "express";
import {createCourse, deleteCourse, enrollCourse, unEnrollCourse, unTeachCourse} from '../db/courses.js'
import {getUser} from "../db/users.js";
import {ensureLoggedIn, ensureTeacher} from "../middleware/authToken.js";
import {ADMIN, STUDENT, TEACHER} from "../roles.js";
import {BadRequestError} from "../util/Errors.js";

export const coursesRouter = express.Router()
coursesRouter.use(ensureLoggedIn)



coursesRouter.get('/', async ({query: {sort, direction}}, res, next) => {
    try {

        const {courses} = await getUser(res.locals.user.username, true)
        return res.json(courses)

    } catch (e) {
        next(e)
    }

})

coursesRouter.post('/', ensureLoggedIn, ensureTeacher, async ({body = {}}, res, next) => {
    try {
        const data = await createCourse(body)
        res.json(data)
    } catch (e) {
        next(e)
    }
})
coursesRouter.delete('/:_id' ,ensureLoggedIn,ensureTeacher, async ({params: {_id}}, res, next) => {
    try {
        await deleteCourse(_id)
        res.json({message: 'deleted'})
    } catch (e) {
        next(e)
    }
})

//enroll in course
coursesRouter.post('/:_id/users/:username', ensureLoggedIn, async ({params: {_id, username}}, res, next) => {
    //TODO add conditional to see if student or if teacher. for now, default to teacher
    try {
        await enrollCourse(username, _id)
        res.json({message: 'enrolled'})

    } catch (e) {
        next(e)
    }
})

//unenroll
coursesRouter.delete('/:_id/users/:username', ensureLoggedIn, async ({params: {_id, username},...req}, res, next) => {
    //TODO add conditional to see if student or if teacher. for now, default to teacher
    const {
        user
    }=res.locals

    try {
        let {role} = user
        ;
        if (role === ADMIN) { // if the admin is handling it on a user's behalf
            ({role} = await getUser(username))
        }

        switch (role) {

            case STUDENT:
                await unEnrollCourse(username, _id)
                break;
            case TEACHER:
                await unTeachCourse(username, _id)
                break;
            default:throw new BadRequestError('User role unspecified')
        }

        res.json({message: 'unenrolled'})

    } catch (e) {
        next(e)
    }
})




