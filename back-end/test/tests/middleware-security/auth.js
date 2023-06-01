import common,{requests} from "../../common/seed-test-db.js";
import {should as chaiShould} from 'chai'
import {PORT, TEST_PORT} from "../../../config.js";



const should = chaiShould()

const prefix = (rest) => `http://localhost:${TEST_PORT}/auth${rest}`

describe('auth middleware security',() => {
    common();
    it('should not log in due to token', async () => {
        try {
            await requests.post.student(prefix('/login'), {username: 'u1', password: "any"})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.data.message. should.equal('Cannot log in twice' )
        }
    })
    it('should not register due to token', async () => {
        try {
            await requests.post.student(prefix('/register'), {})
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
            e.response.data.message. should.equal('Cannot register twice' )
        }
    })
})