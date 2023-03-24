import doAllHooks, {c1, c2, u1, u2} from '../../common/seed-test-db.js'
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../../../db/users.js";
import {should} from 'chai'
import {Courses, Users} from "../../../db/schemas/models.js";
import {jsonify} from "../../../db/util.js";
import {newUser} from "../../../db/schemas/users.js";
import courses from "../../../db/schemas/courses.js";

should()

describe('test user queries', () => {
    doAllHooks()
    describe('basic CRUD Users tests', () => {
        it("should get a User", async () => {
            const user1 = jsonify(await getUser(u1.username))
            user1.should.eql(jsonify(await Users.findOne({username: u1.username}).exec()))
        })
        it("should get all Users", async () => {
            let users = jsonify(await getUsers())

            const expected = jsonify(await Users
                .find({})
                .sort({username: 1})
                .exec())
            users.should.eql(expected)

        })
        it("should update a User", async () => {
            const {username} = u1, password = 'password'

            await updateUser(username, {password})

            const user1 = await Users.findOne({username})
            user1.password.should.equal(password)
        })
        it("should delete a User", async () => {
            const {acknowledged} = await deleteUser(u1.username)
            acknowledged.should.be.true
        })
        it("should create a User", async () => {
            const user3 = jsonify(await createUser(newUser('newUser')))
            const all = jsonify(await Users.find({}).exec())
            all.length.should.eql(3)
            user3.should.eql(all[all.length - 1])
        })
    })
    describe('test options of users functions', () => {
        it('should have getUsers returns list in reverse', async () => {
            const a = jsonify(await Users.create(newUser('a')))
            const f = jsonify(await Users.create(newUser('f')))
            const z = jsonify(await Users.create(newUser('z')))
            await Users.deleteOne({username: 'u1'})
            await Users.deleteOne({username: 'u2'})
            const ls = jsonify(await getUsers({username: -1}))
            ls.should.eql([z, f, a])
        })
        it('should have getUsers returns list in alphabetical order', async () => {
            const a = jsonify(await Users.create(newUser('a')))
            const f = jsonify(await Users.create(newUser('f')))
            const z = jsonify(await Users.create(newUser('z')))
            await Users.deleteOne({username: 'u1'})
            await Users.deleteOne({username: 'u2'})
            const ls = jsonify(await getUsers({username: 1}))
            ls.should.eql([a, f, z])
        })
        it('should have getUsers returns list with courses', async () => {
            const ls = jsonify(await getUsers({username: 1}, true))
            const _u2 = await Users.findOne({username: 'u2'}).populate('courses').exec()
            const _u1 = await Users.findOne({username: 'u1'}).populate('courses').exec()

            ls.should.eql(jsonify([_u1, _u2]))

        })
        it('should have getUsers returns list in reverse with courses', async () => {
            const ls = jsonify(await getUsers({username: -1}, true))
            const _u2 = await Users.findOne({username: 'u2'}).populate('courses').exec()
            const _u1 = await Users.findOne({username: 'u1'}).populate('courses').exec()

            ls.should.eql(jsonify([_u2, _u1]))
        })

        it('should have getUser returns with courses', async () => {
            const user2 = jsonify(await getUser('u2', true))
            const _c1 = jsonify(await Courses.findById(c1._id).exec())
            const _c2 = jsonify(await Courses.findById(c2._id).exec())
            user2.courses.map(({_id})=>_id).should.include(_c1._id)
            user2.courses.map(({_id})=>_id).should.include(_c2._id)

            const {courses, ...rest} = user2
            const {courses: _, ...expectedUser2} = jsonify(await Users.findOne({username: 'u2'}))
            rest.should.eql(expectedUser2)
        })

    })
})