import express from 'express'
import middleware from './middleware/index.js'
import {connect} from "./db/db.js";
import {PORT} from './config.js'
import {fileURLToPath} from 'url'

const [, mainModule] = process.argv
export const conn = await connect(true)

const app = express()
middleware(app)


export const startServer = async (PORT =3001, cb = () => {
    console.log(`Listening on Port ${PORT}`)
}) => await app.listen(PORT, cb)


let isMain = false
if (mainModule === fileURLToPath(import.meta.url)) {
    const server = await startServer(PORT)
    isMain = true
}
