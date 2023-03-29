import {model, Schema} from "mongoose";

const commentsSchema = new Schema({
    post:[{type: Schema.Types.ObjectId, ref: "Post"}],
    username:{ type:String, required:true,unique: true, index: true},
    content:{type:String, required:true},
    timestamp:{type: Schema.Types.Date, required: true}
}, {collection: 'comments'})
export default commentsSchema
