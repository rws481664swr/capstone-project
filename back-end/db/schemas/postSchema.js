import {Schema} from "mongoose";

const postSchema = new Schema( {
        course: {type: Schema.Types.ObjectId, required: true, ref: "Course"},
        username: {type: String},
        user: {type: Schema.Types.ObjectId, ref: "User"},
        title: {type: String, required: true},
        content: {type: String, required: true},
        pinned: {type: Boolean, required: true},
        postDate: {type: Schema.Types.Date, required: true},
        comments:[{type: Schema.Types.ObjectId, ref: "Comments"}]
    },{collection: 'posts'})
;


export default postSchema