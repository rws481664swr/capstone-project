import mongoose from 'mongoose'

export * from './schemas/models.js'

export const connect = async (errorLogging=false)=>{
   const conn= await mongoose.connect(
        process.env.NODE_ENV==='test'
            ? 'mongodb://127.0.0.1:27017/test_db'
            : (process.env.EDU_DB || 'mongodb://127.0.0.1:27017/edu_db'))
   if (errorLogging)
      conn.connection.on('error',(error)=>{
      console.error('Mongoose encountered an error...')
      if(error) console.error(error)
   })
   return conn
}

