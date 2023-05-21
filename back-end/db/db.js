import mongoose from 'mongoose'
import {DB_URI} from '../config.js'

export * from './schemas/models.js'

export const connect = async () => {
    try{
        return await mongoose.connect(DB_URI)
}catch (e) {
        console.log(e.message)
        throw e
    }
}

