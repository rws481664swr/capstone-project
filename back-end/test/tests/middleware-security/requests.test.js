import requests from "./requests.js";
import {should as chaiShould} from 'chai'
const should= chaiShould()

import {tokenConfig as student, teacherTokenConfig as teacher, adminTokenConfig as admin} from "../../common/tokens.js";

const mockAxios ={
    get: async (url, config) => {

        return {url,config}
    },
    post: async (url, body, config) => {
        return {url,body,config}
    },
    put: async (url, body, config) => {
        return {url,body,config}
    },
    delete: async (url, config) => {
        return {url,config}
    }
}


  const req=  requests(mockAxios)
describe('requests test', () => {
    it('should GET',async ()=>{
        let response
         response= await req.get.student('/')
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(student)
         response= await req.get.teacher('/')
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(teacher)
         response= await req.get.admin('/')
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(admin)
    })
    it('should PUT',async ()=>{
        let response
        response= await req.put.student('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(student)
        response= await req.put.teacher('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(teacher)
        response= await req.put.admin('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(admin)

    })
    it('should POST',async ()=>{
        let response
        response= await req.post.student('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(student)
        response= await req.post.teacher('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(teacher)
        response= await req.post.admin('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('body').eql({})
        response.should.have.property('config').eql(admin)
    })
    it('should DELETE',async ()=>{
        let response
        response= await req.delete.student('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(student)
        response= await req.delete.teacher('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(teacher)
        response= await req.delete.admin('/',{})
        response.should.have.property('url').eql('/')
        response.should.have.property('config').eql(admin)
    })

})