import express from 'express'
import users from './routes/users.js'
import courses from './routes/courses.js'
import posts from './routes/posts.js'
import comments from './routes/comments.js'
import {connect} from "./db/db.js";
import {PORT, printReport} from './config.js'
import {fileURLToPath} from 'url'
import cors from "cors";
import morgan from "morgan";
import authenticateJWT, {ensureLoggedIn} from "./middleware/authToken.js";
import auth from './routes/auth.js'
import notFound from './middleware/404.js'
import errorHandler from './middleware/error.js'
const [, mainModule] = process.argv
const isMainModule = mainModule === fileURLToPath(import.meta.url)
const isTest= process.env.NODE_ENV === 'test'
export let conn
isMainModule && printReport()
const app = express()

// middleware
app.use(cors());
app.use(express.json())
app.use(authenticateJWT)

//only use if not in test environment
!isTest && app.use(morgan("tiny"));

//Routers
app.use('/auth', auth)
app.use("/comments", comments)
app.use("/courses", courses)
app.use("/users", users)
app.use("/posts", posts)

//error handling
app.use(notFound)
app.use(errorHandler)



/**
 * starts app server on port PORT_NUM. Passes callback to `listen` function
 * and returns the server.
 * @param PORT_NUM the port to start the express server on.
 * @returns the server started by express.
 */
export async function startServer(PORT_NUM = PORT) {
    conn = await connect(true)
    return app.listen(PORT_NUM,
        () => !isTest &&console.log(`Listening on Port ${PORT_NUM}`));
}

/* c8 ignore next 2*/
if (isMainModule) {
    await startServer()
    // can't programatically stop server so no reason to save return value
}
