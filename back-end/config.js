/* c8 ignore start */

export const BCRYPT_WORK_FACTOR = process.env.NODE_ENV==='test'? 1:15;
export const SECRET_KEY = process.env.SECRET_KEY || "SECRET"
export const PORT = process.env.EDU_PORT || 3001
export const printReport =()=>
console.log(`
BCRYPT_WORK_FACTOR: ${BCRYPT_WORK_FACTOR}
SECRET_KEY: ${SECRET_KEY}
PORT: ${PORT}
`)

/* c8 ignore stop */
