import {LOCAL_DEV_DB, TEST_DB} from "./config.js";

export default function getDB_URI({flag, arg, NODE_ENV, MONGO_USER, MONGO_PASSWORD, EDU_DB_DOMAIN}) {
return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${EDU_DB_DOMAIN}/?retryWrites=true&w=majority`
    if (flag === '--db') {
        switch (arg) {
            case 'local':
                return LOCAL_DEV_DB
            case 'test':
                return TEST_DB
            case 'cloud':
                console.log(`attempting to connect to remote DB as user ${MONGO_USER} at ${EDU_DB_DOMAIN}`)
                console.log( `CONNECTION STRING:  mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${EDU_DB_DOMAIN}/?retryWrites=true&w=majority`)
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
}