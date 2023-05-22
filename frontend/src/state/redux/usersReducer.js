

/*  This reducer is responsible for managing the users.
    It is used in the AdminUsers component.
 */
import {ADD, INIT,REMOVE,UPDATE} from "../actions/actions";

function usersReducer(state, {type, payload,id}) {
    switch (type) {
        case INIT:
            return payload
        case ADD:
            return [...state, payload]
        case REMOVE:
            return state.filter(user => user._id !== id)
        case UPDATE:
            return state.map(user => user._id === payload._id ? payload : user)
        default:
            return state
    }
}


export default usersReducer