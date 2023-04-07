import {should as chaiShould,expect} from 'chai'
import {jsonify} from "../../db/util.js";
import {c1, u1,default as common} from "../common/seed-test-db.js";
import {Schema} from "mongoose";

import _404 from '../../middleware/404.js'
import error from '../../middleware/error.js'
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
describe('404 middleware',()=>{
    it('',()=>{
        _404(         {}, {status: (z) => {
              z.should.equal(404)
              return {json:
                    (x) => x.should.eql({status: 404, message: "Not Found"})
              }
            }},()=>{})
    })
})
describe('error middleware',()=>{
    it('',()=>{
        const expected={status:123,message:'123'}
         error(expected,{},{
             status:function (status){
                 status.should.eql(expected.status);
             return {json:(obj)=>{
                     ({status,
                         ...obj
                     }).should.eql(expected)}}}},()=>{})
    })
    it('',()=>{
        const expected={status:500,message:'Server Error'}

        error({},{},{
             status:function (status=500){
                 status.should.eql(expected.status);
                 return {json:(obj)=>{
                         ({status,
                             ...obj
                         }).should.eql(expected)}}}},()=>{})
    })
    it('',()=>{
        const expected={status:123}

        error(expected,{},{
             status:function (status=500){
                 status.should.eql(expected.status);
                 return {json:(obj={message:'Server Error'})=>{
                         ({status,
                             ...obj
                         }).should.eql({...expected,message:"Server Error"})}}}},()=>{})
    })
    it('',()=>{
        const expected={message:'123'}

        error(expected,{},{
             status:function (status=500){
                 status.should.eql(500);
                 return {json:(obj={message:'Server Error'})=>{
                         ({status,
                             ...obj
                         }).should.eql({status:500,message:expected.message})}}}},()=>{})
    })
})