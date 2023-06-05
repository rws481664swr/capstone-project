import {ADD} from "../actions/actions";

const commentsReducer = (state = [], action) => {
    const {type, id, payload}=action
    console.log ('commentsReducer',type,id,payload)
    switch (type) {
        case "SET_STATE":
            return payload
        case ADD:
        case "ADD_COMMENT":
            return [...state, payload]
        case "REMOVE_COMMENT":
            return state.filter(e => e._id !== id)
        default:
            return state
    }
}
export default commentsReducer