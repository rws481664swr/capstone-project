/* c8 ignore start */
import {fileURLToPath} from "url";
import getDB_URI from "./DB_URI.js";

export const TEST_DB = "mongodb://127.0.0.1:27017/test_db";
export const LOCAL_DEV_DB = "mongodb://127.0.0.1:27017/edu_db";

if (!process.env.PORT) {
    if (process.env.EDU_PORT) process.env.PORT = process.env.EDU_PORT
    else process.env.PORT = 3001

}

const {
    argv: [, mainModule, flag, arg],
    env: {
        NODE_ENV,
        SECRET_KEY: SECRET,
        EDU_PORT,
        EDU_DB,
        MONGO_PASSWORD,
        MONGO_USER,
        EDU_DB_DOMAIN,
        PORT
    }
} = process

export const TEST_PORT = 3002;

export const DB_URI = getDB_URI({
    flag,
    arg,
    NODE_ENV,
    MONGO_USER,
    MONGO_PASSWORD,
    EDU_DB_DOMAIN,
    EDU_DB
})
export {PORT}

export const BCRYPT_WORK_FACTOR = NODE_ENV === "test" ? 1 : 13;
export const SECRET_KEY = SECRET || "SECRET";

export const testIsMainModule = (importmeta) =>
    mainModule === fileURLToPath(importmeta);
export const isTest = NODE_ENV === "test";

export const printReport = () =>
    console.log(`
DB_URI: ${DB_URI}
BCRYPT_WORK_FACTOR: ${BCRYPT_WORK_FACTOR}
SECRET_KEY: ${SECRET_KEY}
PORT: ${PORT}${isTest ? "\nTest Mode: on" : ""}
`);

/* c8 ignore stop */
console.log('config.js')