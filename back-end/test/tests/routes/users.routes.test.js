import doAllHooks, {u1, u2} from '../../common/seed-test-db.js'
import axios from 'axios'
import {token} from "../../common/tokens.js";
import {should} from "chai";
import {jsonify} from "../../../db/util.js";
import {Users} from "../../../db/schemas/models.js";

should()
let server


const config = {
    headers: {authorization: `Bearer ${token}`}
}
const prefix = `http://localhost:3001`


describe('user api routes tests', () => {

    doAllHooks()
    it(`should get all users`, async () => {
        const {data} = await axios.get('http://localhost:3001/users', {...config})
        let y = jsonify(await Promise.all(
            jsonify([u1, u2])
                .map(({username}) =>
                    Users.findOne({username}).exec())))
        data.should.eql(y)
    })
    it(`should get all users in reverse order`, async () => {
        const {data} = await axios.get('http://localhost:3001/users', {...config, params: {username: -1}})
        let y = jsonify(await Promise.all(
            [u1, u2]
                .map(({username}) =>
                    Users.findOne({username})
                        .sort({username: -1}).exec())))
        data.should.eql(y)
    })
    it(`should get user with username u1`, async () => {
        const {data} = await axios.get(`${prefix}/users/u1`, {...config})
        const expected = await Users.findOne({username: 'u1'}).exec()
        data.should.eql(JSON.parse(JSON.stringify(expected.toJSON())))
    })
    it(`should get user with courses`, async () => {
        const {data} = await axios.get(`${prefix}/users/u1/courses`, {...config})
        const _u1 = await Users.findOne({username: 'u1'}).populate('courses').exec()
        data.should.eql(jsonify(_u1))
    })
    it(`should update user's password`, async () => {
        await axios.put(`${prefix}/users/u1`, {password: 'password'}, {...config})
        const _u1 = await Users.findOne({username: 'u1'}).exec()
        _u1.password.should.equal('password')
    })
    it(`should delete u1`, async () => {
        const {data: {message}} = await axios.delete(`${prefix}/users/u1`)
        console.log(message)
        const results = await Users.find({username: 'u1'}).exec()
        results.length.should.equal(0)
        message.should.equal('deleted')
    })

})