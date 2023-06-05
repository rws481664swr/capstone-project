import {Schema} from "mongoose";
import {toString} from "../util.js";

const courseSchema = new Schema({
    courseNumber: {type: Number, required: true},
    courseName: {type: String, required: true},
    subject: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    students: [{type: Schema.Types.ObjectId, ref: "User"}],
    teachers: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {collection: 'courses'})

courseSchema.methods.hasMember = function (test) {
    test = test.toString()
    try {
        if (typeof this.teachers[0] === 'object')
            if ([
                ...this.teachers.map(t => t._id.toString()),
                ...this.students.map(t => t._id.toString())
            ].includes(test))// if teachers are populated
                return true
            else return [
                ...this.students.map(toString),
                ...this.teachers.map(toString),
            ].includes(test) // if teachers are not populated
    } catch (e) {
        console.error('error in hasMember()', e.message)
    }
    return false
}
courseSchema.methods.getTeachers = function () {
    return this.teachers.map(toString)
}
courseSchema.methods.getStudents = function () {
    return this.students.map(toString)
}
courseSchema.methods.hasOneTeacher = function () {
    return this.teachers.length === 1
}

courseSchema.methods.getID = function () {
    return this._id.toString()
}
export default courseSchema