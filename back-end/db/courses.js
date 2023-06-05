import {Courses, Users} from './schemas/models.js'

export const createCourse = async (course) => {
    return await Courses.create(course)
}


export const updateCourse = async (_id, update) => {
    return await Courses.findOneAndUpdate({_id}, update).exec()
}


export const getCourse = async (_id, {teachers, students} = {teachers: undefined, students: undefined}) => {
    let query = Courses.findOne({_id})
    if (teachers) query = query.populate('teachers')
    if (students) query = query.populate('students')
    return await query.exec()

}

export const getCourses = async (sort) => {

    let courses_ = Courses.find({})
    if (sort) courses_ = courses_.sort(sort)
    return await courses_.exec()

}


export const deleteCourse = async (_id) => {
    return await Courses.findOneAndDelete({_id})
}
export const deleteCourseCascade = async (_id) => {
    const course = await Courses.findOne({_id}).exec()
    await Users.updateMany({courses: _id}, {$pull: {courses: _id}}).exec()
    await Courses.deleteOne({_id}).exec()
}


export const teachCourse = async (username, course_id) => {
    await addToCourseList(username, course_id, 'teachers')
}


export const enrollCourse = async (username, course_id) => {
    await addToCourseList(username, course_id, 'students')
}

async function addToCourseList(username, course_id, type) {

    const {_id: user_id} = await Users.findOneAndUpdate({username}, {$push: {courses: course_id}})
    await Courses.findOneAndUpdate({_id: course_id}, {$push: {[type]: user_id}})

}

export const unEnrollCourse= async (username, course_id)=>{
    await removeUserFromCourse(username, course_id,'students')
}
export const unTeachCourse= async (username, course_id)=>{
   await removeUserFromCourse(username, course_id,'teachers')
}
async function removeUserFromCourse(username, course_id, type){
    const {_id: user_id} = await Users.findOneAndUpdate({username}, {$pull: {courses: course_id}})
    await Courses.findOneAndUpdate({_id: course_id}, {$pull: {[type]: user_id}})


}