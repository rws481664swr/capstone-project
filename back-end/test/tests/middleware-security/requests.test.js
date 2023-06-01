import {createRequests as requests} from "./requests.js";
import {should as chaiShould} from 'chai'
import {TEST_PORT as PORT} from "../../../config.js";
import {
    adminTokenConfig as admin,
    default as common,
    teacherTokenConfig as teacher,
    tokenConfig as student
} from "../../common/seed-test-db.js";

const should = chaiShould()

const prefix = `http://localhost:${PORT}/users`
const mockAxios = {
    get: async (url, config) => {

        return {url, config}
    },
    post: async (url, body, config) => {
        return {url, body, config}
    },
    put: async (url, body, config) => {
        return {url, body, config}
    },
    delete: async (url, config) => {
        return {url, config}
    }
}


let req
describe('requests test', () => {
    let response
    describe('should GET', async () => {
        common()
        beforeEach(() => req = requests(mockAxios))

        it('student', async () => {
            response = await req.get.student('/')
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(student)
        })
        it('teacher', async () => {
            response = await req.get.teacher('/')
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(teacher)
        })
        it('admin', async () => {
            response = await req.get.admin('/')
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(admin)
        })
    })
    describe('should PUT', async () => {
        common()
        beforeEach(() => req = requests(mockAxios))

        it('student', async () => {
            response = await req.put.student('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(student)
        })

        it('teacher', async () => {
            response = await req.put.teacher('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(teacher)
        })
        it('admin', async () => {
            response = await req.put.admin('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(admin)
        })

    })
    describe('should POST', async () => {
        common()
        beforeEach(() => req = requests(mockAxios))

        it('student', async () => {
            response = await req.post.student('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(student)
        })
        it('teacher', async () => {
            response = await req.post.teacher('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(teacher)
        })
        it('admin', async () => {
            response = await req.post.admin('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('body').eql({})
            response.should.have.property('config').eql(admin)
        })
    })
    describe('should DELETE', async () => {
        common()
        beforeEach(() => req = requests(mockAxios))

        it('student', async () => {
            response = await req.delete.student('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(student)
        })
        it('teacher', async () => {
            response = await req.delete.teacher('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(teacher)
        })
        it('admin', async () => {
            response = await req.delete.admin('/', {})
            response.should.have.property('url').eql('/')
            response.should.have.property('config').eql(admin)
        })
    })

})