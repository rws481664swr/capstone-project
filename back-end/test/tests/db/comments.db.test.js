import {Comments,Posts} from "../../../db/schemas/models.js";
import {cm1, cm2, default as common, p1, p2, u1} from '../../common/seed-test-db.js'
import{should as _should} from "chai";
import {createComment, editComment, getComments, removeComment} from "../../../db/comments.js";
import {jsonify} from "../../../db/util.js";
import {getPost} from "../../../db/posts.js";


const should = _should()

process.env.NODE_ENV='test'
describe('comments',()=>{
common()
    it("should create a comment",async ()=>{
        const comment =await createComment(p1._id,{username:u1.username,content:'content',timestamp:Date.now()})
        const actualComment =jsonify( await Comments.findById(comment._id).exec())
        const post = jsonify( await Posts.findById(p1._id).exec())
        jsonify(comment).post.should.equal(jsonify(p1)._id)
        actualComment.should.eql(jsonify(comment))
        post.comments.should.include(jsonify(comment)._id)
    })
    it("should edit a comment's content",async ()=>{
        const [a]=jsonify(p1.comments)
        await editComment(a,'new content')
        const comment = jsonify(await Comments.findById(a).exec())
        comment.content.should.equal('new content')
    })
    it("should remove a comment",async ()=>{
        const [a,b]=jsonify(p1.comments)
        await removeComment(a)
        const post = await getPost(p1._id)
        post.comments[0]._id.toString().should.equal(b.toString())
    })
    it("should get all comments associated with a post",async ()=>{

        const [_cm2,_cm1] =(await getComments(p1._id)).map(jsonify)
        _cm2.should.eql(jsonify(cm2))
        _cm1.should.eql(jsonify(cm1))
    })
    it('should create a new comment and update the post', async function() {

        const post_id = jsonify(p2)._id
        const comment = {
            username: 'testuser',
            content: 'Test comment',
            timestamp: new Date()
        };

        const newComment = await createComment(post_id, comment);

        newComment.should.have.property('username').equal(comment.username);
        newComment.should.have.property('content').equal(comment.content);
        newComment.post.toString().should.equal(post_id);

        const post = await Posts.findById(post_id);
        post.comments[0].toString().should.equal(newComment._id.toString());
    });
})
























