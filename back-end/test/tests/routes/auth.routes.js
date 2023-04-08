import axios from "axios";
import common, {u1} from '../../common/seed-test-db.js'
import jwt from "jsonwebtoken";
import {should as chaiShould} from 'chai'
import {PORT} from "../../../config.js";
const should = chaiShould()

const prefix = `http://localhost:${PORT}/auth`
describe('/auth', () => {
    describe('/login', () => {
        common()

        it('should POST /login valid username password', async () => {
            const {role, username} = u1
            const {data} = await axios.post(`${prefix}/login`, {username, password: "password"})
            const {token} = data
            const payload = jwt.decode(token)
            payload.username.should.eql(username)
            payload.role.should.eql(role)
        })
        it('should POST /login invalid username password', async () => {
            const {username} = u1
            try {
                await axios.post(`${prefix}/login`, {username, password: "wrongpassword"})
                should.fail('fail')
            } catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.eql(401)
            }

        })

    })
    describe('/register', () => {
        common()

        it('should POST /register not all fields complete', async function () {
            this.timeout(10000)
           const body = {
               username: "username",
               first_name: "first_name",
               last_name: "last_name",
               email: "email",
               role: "STUDENT",
               password:'password'
           }
            const {data} = await axios.post(`${prefix}/register`,body)


        })

        it('should POST /register no password', async () => {
            try {
                const body = {
                    username: "u3",
                    first_name: "first_name",
                    last_name: "last_name",
                    email: "email",
                    role: "STUDENT"
                }
                await axios.post(`${prefix}/register`,body)
                should.fail('fail')
            }catch (e) {
                e.message.should.not.equal('fail')
                e.response.status.should.equal(400)
            }

        })
        it('should POST /register username already exists', async () => {
            try {
                const body = {
                    username: "u1",
                    first_name: "first_name",
                    last_name: "last_name",
                    email: "email",
                    role: "STUDENT",
                    password:'password'
                }
                await axios.post(`${prefix}/register`,body)
                should.fail('fail')
            }catch (e) {
                e.message.should.not.equal('fail')
            e.response.status.should.equal(400)
            }

        })

    })
})