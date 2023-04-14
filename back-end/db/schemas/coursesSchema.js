import {Schema} from "mongoose";


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
    let toString=o=>o.toString()
    test=test.toString()
    try {
        if ([
            ...this.students.map(toString),
            ...this.teachers.map(toString),
        ].includes(test))
            return true
    } catch (e) {
    console.error('error in hasMember()' , e.message)
    }
return false
}
export default courseSchema