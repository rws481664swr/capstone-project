import {should} from "chai";
import {startServer} from "../../../app.js";
import {c1, doAfterAll, doAfterEach, doBeforeAll, doBeforeEach, p1, u1} from "../../common/seed-test-db.js";
import {token} from "../../common/tokens.js";
import axios from 'axios'
import {jsonify} from "../../../db/util.js";
import {Posts} from "../../../db/schemas/models.js";

const itShould = should()
const config = {
    headers: {authorization: `Bearer ${token}`}
}
const prefix = `http://localhost:3001`


let server

describe('posts api routes', () => {
    before(async () => {
        server = await startServer(3001)
         await doBeforeAll()
    })

    beforeEach(doBeforeEach)
    afterEach(doAfterEach)
    after(async () => {
        await doAfterAll()
        await server.close()
    })
})