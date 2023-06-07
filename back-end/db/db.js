import mongoose from 'mongoose'
import {DB_URI} from '../config.js'
import {Users} from "./schemas/models.js";

export * from './schemas/models.js'

const {MONGO_PASSWORD,MONGO_USER,EDU_DB_DOMAIN} = process.env
export const connect = async () => {
    try{let conn
        conn = await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${EDU_DB_DOMAIN}/?retryWrites=true&w=majority`)
        return conn
}catch (e) {
        try{
            console.log('fallback to local db')
            return await mongoose.connect(DB_URI)
        }catch (e) {
            console.log(e.message)
            throw e
        }
    }
}

