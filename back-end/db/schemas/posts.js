import {faker} from "@faker-js/faker";
import  {Schema} from "mongoose";

const postSchema = new Schema( {
        course: {type: Schema.Types.ObjectId, required: true, ref: "Course"},
        username: {type: String},
        user: {type: Schema.Types.ObjectId, ref: "User"},
        content: {type: String, required: true},
        pinned: {type: Boolean, required: true},
        postDate: {type: Schema.Types.Date, required: true}
    },{collection: 'posts'})
;
export const newPost = (course,user, username) =>
    ({
            course,
            user,
        username,
            content: faker.lorem.paragraph(),
            pinned: false,
            postDate: faker.date.recent(10),
    })
export const _newPost = () =>
    ({
            content: faker.lorem.paragraph(),
            pinned: false,
            postDate: faker.date.recent(10),
    })

export default postSchema