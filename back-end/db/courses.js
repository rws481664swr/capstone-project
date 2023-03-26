import {Courses as courses} from './schemas/models.js'
import Users from "../routes/users.js";

export const createCourse = async (course) => {
    return courses.create(course)
}


export const updateCourse = async (_id, update) => {
    return courses.findOneAndUpdate({_id}, update)
}


export const getCourse = async (_id,{teachers,students}) => {
    let query= courses.findOne({_id})
    if (teachers) query = query.populate('teachers')
     if (students) query = query.populate('students')
    return await query.exec()

}

export const getCourses =async  (sort) => {

    let courses_= courses.findOne({})
    if (sort) courses_ = courses_.sort(sort)
    return courses_

}


export const deleteCourse = async (_id) => {
return courses.findOneAndDelete({_id})
}


export const teachCourse = async (username, _id) => {
    await courses.update({_id},{$push:{teachers:_id}})
    await Users.update({username}, {$push:{courses:_id}})
}


export const enrollCourse = async ()=>{
    await Users.update({username}, {$push:{courses:_id}})
     await courses.update({_id},{$push:{students:_id}})

}