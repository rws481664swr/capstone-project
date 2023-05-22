import {ADD} from "../actions/actions";

const commentsReducer = (state = [], action) => {
    console.log('REDUCER')
    console.log("ACTION",action)
    const {type, id, payload}=action
    switch (type) {
        case "SET_STATE":
            console.log("SET_STATE")
            return payload
        case ADD:
        case "ADD_COMMENT":
            console.log("ADD_COMMENT")
            console.log('add',id,payload)
            return [...state, payload]
        case "REMOVE_POST":
            console.log("REMOVE")
            console.log('remove',id,payload===undefined,state.filter(e => e._id !== id))
            return state.filter(e => e._id !== id)
        default:
            console.log("DEFAULT")
            return state
    }
}
export default commentsReducer