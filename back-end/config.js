/* c8 ignore start */
import {fileURLToPath} from 'url'
const TEST_DB='mongodb://127.0.0.1:27017/test_db'
const LOCAL_DEV_DB='mongodb://127.0.0.1:27017/edu_db'
export let DB_URI=
    process.env.NODE_ENV === 'test'
    ? TEST_DB
    :  process.env.EDU_DB || LOCAL_DEV_DB ;

export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV==='test'? 1:15;
export const SECRET_KEY = process.env.SECRET_KEY || "SECRET"
export const PORT = process.env.EDU_PORT || 3001

const [, mainModule] = process.argv
export const isMainModule = mainModule === fileURLToPath(import.meta.url)
export const isTest= process.env.NODE_ENV === 'test'
export const printReport =()=>
console.log(`
BCRYPT_WORK_FACTOR: ${BCRYPT_WORK_FACTOR}
SECRET_KEY: ${SECRET_KEY}
PORT: ${PORT}${isTest ?  '\nTest Mode: on':""}
`)

/* c8 ignore stop */
