import express from "express";
import {createCourse, deleteCourse, enrollCourse, getCourses, unEnrollCourse} from '../db/courses.js'
import {getUser} from "../db/users.js";
import getSortObj from './util/getSortObj.js'
const router = express.Router()
export default router


router.get('/', async ({query: {sort, direction}}, res, next) => {
    try {
        const user = await getUser(res.locals.user.username, true)
        return res.json(user.courses)

        if (!sort) return res.json(await getCourses())
        const sortObj = getSortObj(sort, direction)
        return res.json(await getCourses(sortObj))
    } catch (e) {
        next(e)
    }

})

router.post('/', async ({body}, res, next) => {
    res.send(await createCourse(body))
})
router.delete('/:id', async ({params: {_id}}, res, next) => {
    res.json(await deleteCourse(_id))
})

//enroll in course
router.post('/:id/users/:username', async ({params: {id, username}}, res, next) => {
    //TODO add conditional to see if student or if teacher. for now, default to teacher
    res.json(await enrollCourse(username, id))
})

//unenroll
router.delete('/:id/users/:username', async ({params: {id, username}}, res, next) => {
    //TODO add conditional to see if student or if teacher. for now, default to teacher
    res.json(await unEnrollCourse(username, id))
})




