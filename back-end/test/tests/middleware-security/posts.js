import common from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";

const should = chaiShould()

const prefix = `http://localhost:${PORT}`
export default()=>{common();
    it('GET /posts',async()=>{})

    it('get post by id if in course or admin/teacher ',async()=>{should.fail('todo')})
    it('get post by id if teacher ',async()=>{should.fail('todo')})
    it('get post by id if admin ',async()=>{should.fail('todo')})


    it('can get users in course if enrolled or admin ',async()=>{should.fail('todo')})
    it('can get users in course if teaching or admin ',async()=>{should.fail('todo')})

    it('can create post if create post if in course (student) or admin',async()=>{should.fail('todo')})
    it('can create post if create post if in course (teacher) or admin',async()=>{should.fail('todo')})
    it('can create post if create post if in course or admin',async()=>{should.fail('todo')})

    it('can update post if create post if owned',async()=>{should.fail('todo')})
    it('cannot update another users post',async()=>{should.fail('todo')})

    it('can pin if teacher',async()=>{should.fail('todo')})

    it('can unpin if teacher',async()=>{should.fail('todo')})

    it('can delete post if owner, teacher or admin',async()=>{should.fail('todo')})

    it('cannot pin a post as a user',async ()=>{should.fail('todo')})
}
