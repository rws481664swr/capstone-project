import {faker} from "@faker-js/faker";
import  {Schema} from "mongoose";

export const newUser = (username, role = "STUDENT") =>
    ({
        username,
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        role
})

const userSchema =new Schema({
        username: {type: String, required: true, index: true},
        password: {type: String, required: true},
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
export default userSchema