import express from "express";
import {createCourse, deleteCourse, enrollCourse, getCourses, unEnrollCourse} from '../db/courses.js'
import {getUser} from "../db/users.js";
import getSortObj from './util/getSortObj'
const router = express.Router()
export default router

//enroll in course
router.post('/:id/users/:username',async (req,res)=>{})

//unenroll
router.delete('/:id/users/:username',async (req,res)=>{})