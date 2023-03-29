import {PORT} from "../../../config.js";
import {default as _axios} from "axios";
import {jsonify} from "../../../db/util.js";
import {should as chaiShould} from "chai";
import {getUser} from '../../../db/users.js'
import {c1, c2, default as common, u1} from "../../common/seed-test-db.js";
import {getCourse, getCourses} from "../../../db/courses.js";
import {teacherTokenConfig, token, tokenConfig} from "../../common/tokens.js";
const should = chaiShould()
const prefix = `http://localhost:${PORT}`


const axios = {
    get: (route) => _axios.get(`${prefix}${route}`, tokenConfig),
    put: (route, body) => _axios.put(`${prefix}${route}`, body, tokenConfig),
    post: (route, body) => _axios.post(`${prefix}${route}`, body, tokenConfig),
    delete: (route) => _axios.delete(`${prefix}${route}`, tokenConfig)
}



describe('students',()=> {
    describe('can...', () => {
        common()
        it ('should be able to create a post in a course they are in',async ()=>{
            await axios.post()
            should.fail('fail')
        })
        it( 'can comment on a post',async ()=>{
            should.fail('fail')
        })
        it( 'can join course from link',async ()=>{
            should.fail('fail')
        })
        it ('can view their courses',async ()=>{
            should.fail('fail')
        })
        it ('can view posts in a course',async ()=>{
            should.fail('fail')
        })
        it('should be able to edit their own post', async () => {
            should.fail('fail')
        })
        it('', async () => {  })
    })
    describe('cannot...', () => {
        common()
        it ('cannot create a post for a course they are not in',async ()=>{
            should.fail('fail')
        })

        it('create a course', async () => {
            should.fail('fail')
        })
        it('create course invite link', async () => {
            should.fail('fail')
        })
        it('remove post', async () => {
            should.fail('fail')
        })
        it('pin post', async () => {
            should.fail('fail')
        })
        it('unpin post', async () => {
            should.fail('fail')
        })
    })
})
