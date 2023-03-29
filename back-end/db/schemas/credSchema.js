import {Schema} from "mongoose";

const credSchema= new Schema({
    username:{ type:String, required:true,unique: true, index: true},
    password: {type:String, required:true},
}, {collection: 'creds'})
export default credSchema
