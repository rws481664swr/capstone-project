import {should as chaiShould,expect} from 'chai'
import {jsonify} from "../../db/util.js";
import {c1, u1,default as common} from "../common/seed-test-db.js";
import {Schema} from "mongoose";
const should = chaiShould()

describe('jsonify',()=>{
    it('should return null if passed null',()=>{
        const actual= jsonify(null)
        expect(actual).to.be.null
    })
    it('should return a primitive if passed one',()=>{
        jsonify(1).should.eql(1)
        jsonify('x').should.eql('x')
        jsonify(false).should.eql(false)

    })
    it('should return an empty object if passed one',()=>{
        jsonify({}).should.eql({})
    })
    it('should return an empty array if passed one',()=>{
        jsonify([]).should.eql([])
    })
    it('should return an primitive array of primitives if passed one',()=>{
        jsonify([1,2,false,'x']).should.eql([1,2,false,'x'])
    })
    it('should return an array of objects if passed one',()=>{
        jsonify([{x:'true'},{}]).should.eql([{x:'true'},{}])
    })
    it('should return an mixed array if passed one',()=>{
        jsonify([{x:'true'},{},false]).should.eql([{x:'true'},{},false])
    })
    describe('model tests',()=>{
        common()
    it('should extract model instance properties',async ()=>{

        const json=jsonify(u1)
        json.username.should.eql(u1.username)
        json.first_name.should.eql(u1.first_name)
        json.courses.should.eql([c1._id.toString()])

    })
    })

})