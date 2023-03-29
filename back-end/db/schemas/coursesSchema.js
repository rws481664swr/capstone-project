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
export default courseSchema