import {faker} from "@faker-js/faker";
import {Schema} from "mongoose";

export const newCourse = () =>
    ({
        subject: faker.lorem.word(),
        endDate: faker.date.recent(1),
        startDate: faker.date.recent(7),
        courseName: faker.name.middleName(),
        courseNumber: faker.datatype.number()
    })
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