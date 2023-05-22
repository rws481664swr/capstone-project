import {ADD, INIT, REMOVE, UPDATE} from "../../actions/actions";

export const addUser = (user) => {
    return {
        type: ADD,
        payload: user
    }
}

export const removeUser = (id) => {
    return {
        type: REMOVE,
        payload: id
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE,
        payload: user
    }
}

export const initUsers = (users) => {
    return {
        type: INIT,
        payload: users
    }
}