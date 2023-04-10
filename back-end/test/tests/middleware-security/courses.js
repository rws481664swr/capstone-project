import common from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";

const should = chaiShould()

const prefix = `http://localhost:${PORT}`
export default ()=>{common();
    it('should be able to create as teacher',async()=>{should.fail('todo')})
    it('should be able to create as admin',async()=>{should.fail('todo')})
    it('should be NOT be able to create as student',async()=>{should.fail('todo')})

    it('cannot delete a course if student',async()=>{should.fail('todo')})
    it('teacher cannot delete a course if not a teacher of the course',async()=>{should.fail('todo')})
    it('',async()=>{should.fail('todo')})
}
