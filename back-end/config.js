/* c8 ignore start */
import {fileURLToPath} from "url";

export const TEST_DB = "mongodb://127.0.0.1:27017/test_db";
export const LOCAL_DEV_DB = "mongodb://127.0.0.1:27017/edu_db";
const {} = process.env
const {
    argv: [, mainModule, flag,arg],
    env: {
        NODE_ENV,
        SECRET_KEY: SECRET,
        EDU_PORT,
        EDU_DB,
        MONGO_PASSWORD,
        MONGO_USER,
        EDU_DB_DOMAIN
    }
} = process

export const TEST_PORT = 3002;

export const DB_URI = (() => {
    if(flag==='--db') {
        switch (arg){
            case 'local':
                return LOCAL_DEV_DB
            case 'test':
                return TEST_DB
            case 'cloud':
                console.log(`attempting to connect to remote DB as user ${MONGO_USER} at ${EDU_DB_DOMAIN}`)
                return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${EDU_DB_DOMAIN}/?retryWrites=true&w=majority`
        }
    }
    const ATLAS = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${EDU_DB_DOMAIN}/?retryWrites=true&w=majority`


    switch (NODE_ENV) {
        case "test":
            return TEST_DB
        case "development":
            return LOCAL_DEV_DB
        case "production":
        case 'cloud':
            console.log(`attempting to connect to remote DB as user ${MONGO_USER} at ${EDU_DB_DOMAIN}`)
            return ATLAS
        default:
            return LOCAL_DEV_DB
    }
})()


export const BCRYPT_WORK_FACTOR = NODE_ENV === "test" ? 1 : 13;
export const SECRET_KEY = SECRET || "SECRET";
export const PORT = EDU_PORT || 3001;

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
