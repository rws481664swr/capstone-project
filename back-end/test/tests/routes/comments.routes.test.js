import {PORT} from "../../../config.js";
import _axios from "axios";
import {jsonify} from "../../../db/util.js";
import {should as chaiShould} from "chai";
import {c1, cm1, cm2, default as common, p1} from "../../common/seed-test-db.js";
import {tokenConfig} from "../../common/tokens.js";

const should = chaiShould()
const prefix = `http://localhost:${PORT}/comments`

const axios = {
    async get(id, config = tokenConfig) {
        return _axios.get(`${prefix}/${id.toString()}`, config)
    },
    async put(id, body, config = tokenConfig) {
        return _axios.put(`${prefix}/${id}`, body, config)
    },
    async post(body, config = tokenConfig) {
        return _axios.post(prefix, body, config)

    },
    async delete(id, config = tokenConfig) {
        return _axios.delete(`${prefix}/${id}`, config)

    }
}
describe('/comments', () => {
    common()
    it('should get a comments from a post', async () => {
        const {data: comments} = await axios.get(p1._id)
        comments.should.deep.include(jsonify(cm1))
        comments.should.deep.include(jsonify(cm2))
    })
    it('should when failing to find from a post', async () => {
        try {
            await axios.get(c1._id)
            should.fail('fail')
        } catch ({message = 'error', response: {status}}) {
            message.should.not.equal('fail')
            status.should.equal(404)
        }
    })
    it('should create a comment', async () => {
        const newComment = {
            post: p1._id.toString(),
            username: 'u1',
            content: 'new post',
            timestamp: new Date()
        }
        const {data: comment, status} = await axios.post(newComment)
        status.should.equal(201)
        comment.should.have.property('username').equal('u1')
        comment.should.have.property('content').equal('new post')
        comment.should.have.property('timestamp')
    })
    it('should fail to create a comment given no data', async () => {
        const newComment = {
            post: p1._id.toString(),
            username: 'u1',
            timestamp: new Date()
        }
        try {
            await axios.post(newComment)
            should.fail('fail')
        } catch (e) {
            e.message.should.not.equal('fail')
        }

    })
    it('should edit a comment', async () => {
        const {data, status} = await axios.put(cm1._id, {comment: 'new content'})
        status.should.equal(200)
        data.should.have.property('content').equal('new content')
    })
    it('should fail to edit comment due to bad id', async () => {
        try{
            await axios.put(p1._id, {comment: 'new content'})
            should.fail('fail')
        }catch (e){
            e.message.should.not.equal('fail')
        }
    })
    it('should fail to edit comment due to bad data', async () => {
        try{
            await axios.put(p1._id, {})
            should.fail('fail')
        }catch (e){
            e.message.should.not.equal('fail')
        }
    })
    it('should fail to edit comment due to bad id', async () => {
        try{
            await axios.put(cm1._id, {})
            should.fail('fail')
        }catch (e){
            e.message.should.not.equal('fail')
        }
    })
    it('should delete a comment', async () => {
             await axios.delete(cm1._id)

    })
    it('should send 404 when failing to delete a nonexistent comment', async () => {
        try{
            await axios.delete(c1._id)
            should.fail('fail')
        }catch (e){
            e.message.should.not.equal('fail')
        }
    })
})