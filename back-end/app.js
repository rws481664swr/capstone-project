import express from 'express'
import users from './routes/users.js'
import courses from './routes/courses.js'
import posts from './routes/posts.js'
import {connect} from "./db/db.js";
import {PORT} from './config.js'
import {fileURLToPath} from 'url'
import cors from "cors";
import morgan from "morgan";
import {ServerError} from "./util/Errors.js";

const [, mainModule] = process.argv
const isMainModule = mainModule === fileURLToPath(import.meta.url)
export const conn = await connect(true)

const app = express()

// middleware
app.use(cors());
app.use(express.json())

//only use if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan("tiny"));
}

//Routers
app.use("/courses", courses)
app.use("/users", users)
app.use("/posts", posts)

export const startServer = async (PORT =3001, cb = () => {
    console.log(`Listening on Port ${PORT}`)
}) => await app.listen(PORT, cb)


let isMain = false
if (mainModule === fileURLToPath(import.meta.url)) {
    const server = await startServer(PORT)
    isMain = true
}
