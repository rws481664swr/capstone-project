import mongoose from 'mongoose'
import {DB_URI, LOCAL_DEV_DB} from '../config.js'

export * from './schemas/models.js'

export const connect = async () => {
    try{
        return await mongoose.connect(DB_URI)
}catch (e) {
        try{

            console.log('Failed to connect to remote db' + e.message)
            return await mongoose.connect(LOCAL_DEV_DB)
        }catch (e) {
            console.log(e.message)
            throw e
        }
    }
}

