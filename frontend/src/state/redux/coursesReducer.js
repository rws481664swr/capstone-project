import {COURSES_ACTIONS} from "../actions/actions";
const {INIT,ADD,REMOVE,UPDATE}=COURSES_ACTIONS
const coursesReducer=(state=[], {type,payload})=>{
    switch(type){
        case INIT:
            return payload
        case ADD:
            return [ payload,...state]
        case REMOVE:
            return state.filter(course => course._id !== payload)
        case UPDATE:
            return state.map(course => course._id === payload._id ? payload : course)
        default:
            return state
    }
}
export default coursesReducer