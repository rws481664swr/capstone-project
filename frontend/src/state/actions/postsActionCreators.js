import {BASE_URL} from "../../config";

function createPIN(){
    return async function(){

    }
}
function createADD(token){
    return async function(dispatch){

    }
}
function createREMOVE(token){
    return async function(dispatch){

    }
}
function createSET_STATE(cid,cfg){
    return async function(dispatch){
        // try{
        //     const {data}=await axios.get(`${BASE_URL}/posts/courses/${cid}`,cfg)
        // }catch (e) {
        //     console.error(e)
        // }
    }
}
function createUNPIN(token){
    return async function(dispatch){

    }
}
function createUPDATE(token){
    return async function(dispatch){

    }
}
const actions={
    createPIN,
    createADD,
    createREMOVE,
    createSET_STATE,
    createUNPIN,
    createUPDATE,
}
export default actions