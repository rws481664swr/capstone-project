import {faker} from "@faker-js/faker";
import {Schema} from "mongoose";
import {ADMIN, STUDENT, TEACHER} from "../../roles.js";

export const newUser = (username, role = "STUDENT") =>
    ({
        username,
        password: 'password',
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role
    })

const userSchema = new Schema({
        username: {type: String, required: true, unique: true, index: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        email: {type: String},
        courses: [{type: Schema.Types.ObjectId, ref: "Course"}],

        role:
            {
                type: String,
                enum: ['STUDENT', 'TEACHER', 'ADMIN'],
                required: true
            },
    }, {collection: 'users'})
;
userSchema.methods.getID = function () {
    return this._id.toString()
}
userSchema.methods.studentCanEnroll = function (course) {
        return this.role===STUDENT &&
            course.getStudents().includes(this.id())

}

export default userSchema