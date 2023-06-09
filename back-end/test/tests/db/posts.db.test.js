import {c1, default as common, p1, p2, p3, u1} from "../../common/seed-test-db.js";
import {Posts} from '../../../db/db.js'
import {
    createPost,
    deletePost,
    getPinned,
    getPost,
    getPosts,
    getPostsFromCourse,
    getPostsFromUser,
    pinPost,
    unpinPost,
    updatePost
} from '../../../db/posts.js'
import {should} from "chai";
import {jsonify} from "../../../db/util.js";
import {Schema} from "mongoose";

const itShould = should()
describe('test post queries', () => {
    common() /* c8 ignore next */

    it('should create a post',async()=>{
        let _post ={
            course: c1._id,
            title:'t',
            username:u1.username,
            user: u1._id,
            content: "content!",
            pinned: false,
            postDate: new Date()
        }
       _post= await createPost(_post)
      const post =  jsonify(_post )

        const post2=jsonify(await Posts.findById(post._id).exec())
        post2.should.eql(jsonify(post))
    } )
    it("should get a post by id", async () => {
        const post = await getPost(p1._id)
        post.should.eql(p1)

    })
    it("should get all posts", async () => {
        const posts = jsonify(await getPosts())
        const expected =  await Posts.find({}).sort({postDate: -1}).exec()
        posts.should.eql(jsonify(expected))
    })

    it('should get all posts in a course', async () => {
        const posts = jsonify(await getPostsFromCourse(c1._id))
        //not testing order in this test
        posts.should.deep.include(jsonify(p1))
        posts.should.deep.include(jsonify(p3))

    })
    it('should get all posts by a user', async () => {
        const posts = jsonify(await getPostsFromUser(u1.username))
        posts.should.deep.include(jsonify(p1))
        posts.should.deep.include(jsonify(p2))

    })
    it('should get all pinned posts', async () => {
        await Posts.findOneAndUpdate({_id: p1._id}, {pinned: true}).exec()
        const posts = jsonify(await getPinned())
        posts.should.eql([{...jsonify(p1), pinned: true}])

    })
    it('should get all posts sorted by user', async () => {
        const posts = jsonify(await getPosts({username: 1}))
        const [postA, postB, ...post3shouldBeHere] = posts;
        [postA,postB].should.deep.include(jsonify(p1));
        [postA,postB].should.deep.include(jsonify(p2));
        post3shouldBeHere.should.deep.include(jsonify(p3))
    })
    it('should get all posts sorted by user reverse', async () => {
        const posts = jsonify(await getPosts({username: -1}))
        //u2 is the last alphabetically and only wrote p3.
        // ordering of everything else could have secondary sorting,
        // so it's less important to test here .
        posts[0].should.eql(jsonify(p3 ))


    })

    it('should get all posts sorted by post date asc', async () => {
        const [a, b, c] =
            jsonify(await getPosts({postDate: 1}))
                .map(({postDate}) => postDate).map(d => new Date(d))

        c.valueOf().should.be.greaterThan(b.valueOf())
        b.valueOf().should.be.greaterThan(a.valueOf())
    })
    it('should get all posts sorted by post date desc', async () => {
        const [a, b, c] =
            jsonify(await getPosts({postDate: -1}))
                .map(({postDate}) => postDate).map(d => new Date(d))

        a.valueOf().should.be.greaterThan(b.valueOf())
        b.valueOf().should.be.greaterThan(c.valueOf())
    })


    it('should pin a post', async () => {
        await pinPost(p1._id)
        const _p1 = await Posts.findById(p1._id).exec()
        _p1.pinned.should.be.true
    })
    it('should unpin a course', async () => {

        await pinPost(p1._id)
        let _p1 = await Posts.findById(p1._id).exec()
        _p1.pinned.should.be.true
        await unpinPost(p1._id)
        _p1 = await Posts.findById(p1._id).exec()
        _p1.pinned.should.be.false

    })

    it('should update a post', async () => {
        const content = 'hello world'
        await updatePost({_id: p1._id}, {content})
        const user = await Posts.findById(p1._id).exec()
        user.content.should.equal(content)
    })

    it('should create a post', async () => {
        const newPost = jsonify(await Posts.create({
            course: c1._id,
            title:'t',
            username: u1.username,
            content: 'hello world',
            pinned: true,
            postDate: new Date()
        }))
        const post = jsonify(await Posts.findById(newPost._id).exec())
        newPost.should.eql(post)
    })
    it('should delete a post', async () => {
        await deletePost(p1._id)
        const post = (await Posts.findById(p1._id).exec())
        itShould.not.exist(post)
    })

})