import {Courses as courses} from './schemas/models.js'

export const createCourse = (course) => {
    return courses.create(course)
}


export const updateCourse = (_id, update) => {
    return courses.findOneAndUpdate({_id}, update)
}


export const getCourse = (_id) => {
    return courses.findOne({_id})

}

export const getCourses = (sort) => {

    let courses_= courses.findOne({})
    if (sort) courses_ = courses_.sort(sort)
    return courses_

}


export const deleteCourse = (_id) => {
return courses.findOneAndDelete({_id})
}


export const teachCourse = (username, _id) => {
    // return courses.update({_id},{$push:{username:}})///TODO $push
}


export const enrollCourse = ()=>{

}