import mongoose from 'mongoose'
import {DB_URI, LOCAL_DEV_DB, TEST_DB} from '../config.js'

export * from './schemas/models.js'

export const connect = async (isTest) => {
    try{
        console.log('connecting...')
        if (isTest) return await mongoose.connect(TEST_DB)
        console.log(`DB URI: ${DB_URI}`)
        return await mongoose.connect(DB_URI)
}catch (e) {
        try{
            console.log('Failed to connect to remote db' + e.message)
            console.log('trying to connect to localhost')
            return await mongoose.connect(LOCAL_DEV_DB)
        }catch (e) {
            console.log('failed to connect to localhost')
            console.log('Error: ',e.message)

        }
    }
}

