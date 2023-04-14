import doAllHooks, {admin, adminTokenConfig, tokenConfig, u1, u2} from '../../common/seed-test-db.js'
import axios from 'axios'
import {should} from "chai";
import {jsonify} from "../../../db/util.js";
import {Users} from "../../../db/schemas/models.js";
import {login} from "../../../db/creds.js";
import {getUser, updateUser} from "../../../db/users.js";
should()
let server



const prefix = `http://localhost:3001/users`


describe('user api routes tests', function ()  {
this.timeout(20000)
    describe("GET", () => {
        doAllHooks()

        it(`should get all users`, async () => {
            const {data} = await axios.get(prefix, adminTokenConfig)
            let y = jsonify(await Promise.all(
                jsonify([admin,u1, u2])
                    .map(({username}) =>
                        Users.findOne({username}).exec())))
            data.should.eql(y)
        })
        it(`should get all users in reverse order`, async () => {
            const {data} = await axios.get(prefix, {...adminTokenConfig, params: {username: -1}})
            let y = jsonify(await Promise.all(
                [admin,u1, u2]
                    .map(({username}) =>
                        Users.findOne({username})
                            .sort({username: -1}).exec())))
            data.should.eql(y)
        })
        it(`should get user with username u1`, async () => {
            const {data} = await axios.get(`${prefix}/u1`, tokenConfig)
            const expected = await Users.findOne({username: 'u1'}).exec()
            data.should.eql(JSON.parse(JSON.stringify(expected.toJSON())))
        })
        it(`should get user with courses`, async () => {
            const {data} = await axios.get(`${prefix}/u1/courses`, tokenConfig)
            const _u1 = await Users.findOne({username: 'u1'}).populate('courses').exec()
            data.should.eql(jsonify(_u1))
        })
    })

    describe('PUT', () => {
        doAllHooks()

        it('should update the user for the given username', async () => {
            const {username} = u1;
            const first_name = 'Test';
            const last_name = 'User';

            const {data, status} = await axios.put(`${prefix}/${username}`, {first_name, last_name},tokenConfig);

            status.should.equal(200);
            data.should.deep.equal({
                    first_name, last_name,...jsonify(u1),
           });

        });

        it('should return a Bad Request error if the username is changed', async () => {
            const {username} = u1;
            const newUsername = 'newusername';

            try {
                await axios.put(`${prefix}/${username}`, {username: newUsername},tokenConfig);
            } catch (err) {
                err.response.status.should.equal(400);
                err.response.data.message.should.equal('cannot change username');
            }

        });

        it(`should change user password`, async function () {
            this.timeout(20000)
            await axios.put(`${prefix}/u1/password`, {password: 'newpassword',old:'password'}, tokenConfig)
            ;(await login('u1', 'newpassword')).should.be.true
        })

        it('should update the password for the given user', async function () {
            this.timeout(20000)
            const {username} = u1
            const old = 'password';
            const newPassword = 'newpassword';
            const res = await axios.put(`${prefix}/${username}/password`, {
                old,
                password: newPassword
            },tokenConfig);
            res.status.should.equal(200);
            res.data.message.should.equal('updated');
            ;(await login(username, newPassword)).should.be.true
        });

        it('should return an error if the old password is incorrect', async () => {
            const {username} = u1
            try {
                await axios.put(`${prefix}/${username}/password`, {
                    old: 'wrongpass',
                    password: 'newpass'
                },tokenConfig);
            } catch (error) {
                error.response.status.should.equal(401);
            }
        });

    })
    describe('DELETE', () => {
        doAllHooks()

        it(`should delete u1`, async () => {
            const {data: {message}} = await axios.delete(`${prefix}/u1`,tokenConfig)
            const results = await Users.find({username: 'u1'}).exec()
            results.length.should.equal(0)
            message.should.equal('deleted')
        })
    })
})