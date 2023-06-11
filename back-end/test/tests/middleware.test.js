import {should as Should} from "chai";
import common, {u1, u2} from "../common/seed-test-db.js";
import authenticateJWT, {ensureAdmin, ensureLoggedIn} from "../../middleware/authToken.js";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../config.js";
import staleOrInvalidData from "../../middleware/staleOrInvalidData.js";
import {UnauthorizedError} from "../../util/Errors.js";
import {ADMIN, STUDENT} from "../../util/roles.js";
import {Users} from "../../db/schemas/models.js";
const should = Should()

describe('middleware', () => {
    const tokenPayload = {
        _id: '123',
        username: 'test',
        isAdmin: false,

        timestamp:new Date()
    }
    const _next={called:false}

    const next = (err)=>{
        _next.called=true
        _next.err= err
    }
    afterEach(()=>{
        delete  _next.err
        _next.called=false;
    })
    describe('authToken', () => {


        const token = jwt.sign(tokenPayload,SECRET_KEY)
        const authorization = `Bearer ${token}`
        it('should not populate res.locals.user if no token is provided', async () => {
            const req = {headers: {}}
            const res = {locals: {}}


            await authenticateJWT(req, res, next)
            _next.called.should.be.true
            res.locals.should.not.have.property('user')
        } )
        it('should call next with an error if token is invalid', async () => {

            const _next={called:false}
            const token= jwt.sign(tokenPayload,'NOT SECRET KEY',{})
            const req = {headers: {authorization: `Bearer ${token}`}}
            const res = {locals: {}}
            const next = (err)=>{
                _next.called=true
                _next.err= err
            }

            await authenticateJWT(req, res, next)
            _next.called.should.be.true
            _next.err.name.should.equal('JsonWebTokenError')
            _next.err.message.should.equal('invalid signature')

        })
        it('should populate res.locals.user if token is valid', async () => {
            const _next={called:false}
            const token= jwt.sign(tokenPayload,SECRET_KEY)
            const req = {headers: {authorization}}
            const res = {setHeader:()=>{} , locals: {}}
            const next = (err)=>{
                _next.called=true
                _next.err= err
            }

            await authenticateJWT(req, res, next)
            _next.called.should.be.true
            res.locals.should.have.property('user')
            res.locals.user.should.have.property('username').equal(tokenPayload.username)
            res.locals.user.should.have.property('isAdmin').equal(tokenPayload.isAdmin)
            res.locals.user.should.have.property('_id').equal(tokenPayload._id)
            res.locals.user.should.have.property('iat')

        })
    })
    describe('ensureLoggedIn', () => {

        it('should call next with an error if res.locals.user is not defined', async () => {
            const req = {headers: {}}
            const res = {locals: {}}
            await ensureLoggedIn(req, res, next)
            _next.called.should.be.true
            _next.err.should.be.an.instanceof(UnauthorizedError)
            _next.err.message.should.equal('Must be logged in')
        })
        it('should call next if res.locals.user is defined', async () => {

            const req = {headers: {}}
            const res = {locals: {user:{}}}
            await ensureLoggedIn(req, res, next)
            _next.called.should.be.true
            should.not.exist(_next.err)
        }  )



    })
    describe('ensureAdmin', () => {
        it('should call next with an error if res.locals.user is not defined', async () => {
            const req = {headers: {}}
            const res = {locals: {}}
            await ensureAdmin(req, res, next)
            console.log(_next.err.message)
            _next.called.should.be.true
            _next.err.should.be.an.instanceof(UnauthorizedError)
            _next.err.message.should.equal('Must be an administrator')
        })
        it('should call next with an error if res.locals.user.isAdmin is false', async () => {
            const req = {headers: {}}
            const res = {locals: {user:{role:STUDENT}}}
            await ensureAdmin(req, res, next)
            _next.called.should.be.true
            _next.err.should.be.an.instanceof(UnauthorizedError)
            _next.err.message.should.equal('Must be an administrator')
        })
        it('should call next if res.locals.user.isAdmin is true', async () => {
            const req = {headers: {}}
            const res = {locals: {user:{role:ADMIN}}}
            await ensureAdmin(req, res, next)
            _next.called.should.be.true
            should.not.exist(_next.err)
        })

    })

})