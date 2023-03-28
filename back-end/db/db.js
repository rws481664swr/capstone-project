import mongoose from 'mongoose'

export * from './schemas/models.js'

export const connect = async ()=>{
  return await mongoose.connect(
        process.env.NODE_ENV==='test'
            ? 'mongodb://127.0.0.1:27017/test_db'
            :    /* c8 ignore next */
            (process.env.EDU_DB || 'mongodb://127.0.0.1:27017/edu_db')
   )
}

