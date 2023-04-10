import common from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";

const should = chaiShould()

const prefix = `http://localhost:${PORT}`
export default ()=>{common();
    it('should have token associated with posts course',async()=>{should.fail('todo')})
    it('should not allow user not in course to view comments',async()=>{should.fail('todo')})
    it('should be able to post in course as student/teacher',async()=>{should.fail('todo')})
    it('should not be able to post in course if not enrolled',async()=>{should.fail('todo')})
    it('update comment should be done by owner, teacher, or admin',async()=>{should.fail('todo')})
    it('should allow user, teacher or owner to delete comment',async()=>{should.fail('todo')})
}
