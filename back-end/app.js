import express from "express";
import {
  authRouter,
  commentsRouter,
  coursesRouter,
  postsRouter,
  usersRouter,
} from "./routes/routers.js";
import {
  authenticateJWT,
  errorHandler,
  notFound,
} from "./middleware/middleware.js";
import { connect } from "./db/db.js";
import { testIsMainModule, isTest, PORT, printReport } from "./config.js";
import cors from "cors";
import morgan from "morgan";
const isMainModule = testIsMainModule(import.meta.url);

export let conn;
isMainModule && printReport();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(authenticateJWT);

//only use if not in test environment
!isTest && app.use(morgan("tiny"));

//Routers
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);
app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

//error handling
app.use(notFound);
app.use(errorHandler);

/**
 * starts app server on port PORT_NUM. Passes callback to `listen` function
 * and returns the server.
 * @param PORT_NUM the port to start the express server on.
 * @returns the server started by express.
 */
export async function startServer(PORT_NUM = PORT) {
  conn = await connect(true);
  return app.listen(
    PORT_NUM,
    () => !isTest && console.log(`Listening on Port ${PORT_NUM}`)
  );
}

/* c8 ignore next 2*/
if (isMainModule) {
  await startServer();
  // can't programatically stop server so no reason to save return value
}
