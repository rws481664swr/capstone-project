/* c8 ignore start */
import { fileURLToPath } from "url";
const TEST_DB = "mongodb://127.0.0.1:27017/test_db";
const LOCAL_DEV_DB = "mongodb://127.0.0.1:27017/edu_db";

const{
  argv:[,mainModule],
  env:{
    NODE_ENV,
  SECRET_KEY:SECRET,
  EDU_PORT,
  EDU_DB
  }
}= process

export const TEST_PORT = 3002;

export let DB_URI =
  NODE_ENV === "test"
    ? TEST_DB
    : EDU_DB 
    || LOCAL_DEV_DB;


export const BCRYPT_WORK_FACTOR = NODE_ENV === "test" ? 1 : 15;
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
