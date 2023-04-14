import common,{requests} from "../../common/seed-test-db.js";
import {should as chaiShould} from "chai";
import {PORT} from "../../../config.js";

const should = chaiShould()

const prefix = `http://localhost:${PORT}`
describe('users middleware security',()=>{
    common();
    it('only admin can get all users',async()=>{should.fail('todo')})
    it('admin can get user',async()=>{should.fail('todo')})
    it('teacher of student can get user',async()=>{should.fail('todo')})
    it('user can get themself',async()=>{should.fail('todo')})
    it('student cannot get other user',async()=>{should.fail('todo')})
    it('student/teacher can get their courses',async()=>{should.fail('todo')})
    it('student/teacher cannot get others get their courses',async()=>{should.fail('todo')})
    it('user can update self',async()=>{should.fail('todo')})
    it('non-admin cannot update other',async()=>{should.fail('todo')})
    it('admin can update other users',async()=>{should.fail('todo')})
    it('only user can change password',async()=>{should.fail('todo')})
    it('admin can change any password',async()=>{should.fail('todo')})
    it('non-admin cannot POST to users',async()=>{should.fail('todo')})
    it('admin can POST to users',async()=>{should.fail('todo')})
    it('user can delete themself',async()=>{should.fail('todo')})
    it('admin can delete user',async()=>{should.fail('todo')})
    it('others cannot delete user',async()=>{should.fail('todo')})
    it('',async()=>{should.fail('todo')})

})