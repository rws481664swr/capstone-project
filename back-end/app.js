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
export let conn

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


/**
 * 404 catch-all
 */
app.use(( req, res, next)=>{
    res.status(404).json({status:404,message:"Not Found"})
})
app.use((err, req, res, next)=>{
    try{
        const {status,message}= err
        if(!status) return res.json(new ServerError(message))
        else return res.status(status).json({status,message})

    }catch (e) {
        return res.status(500).json(new ServerError("Server Error"))

    }
})




/**
 * starts app server on port PORT_NUM. Passes callback to `listen` function
 * and returns the server.
 * @param PORT_NUM the port to start the express server on.
 * @returns the server started by express.
 */
export async function startServer(PORT_NUM = PORT) {
    conn = await connect(true)
    return app.listen(PORT_NUM,
        () => console.log(`Listening on Port ${PORT_NUM}`));
}


if (isMainModule) {
    await startServer()
    // can't programatically stop server so no reason to save return value
}
