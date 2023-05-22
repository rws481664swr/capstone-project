const coursesReducer=(state=[], {type,payload})=>{
    switch(type){
        case 'INIT':
            return payload
        case 'ADD':
            return [...state, payload]
        case 'REMOVE':
            return state.filter(course => course._id !== payload)
        case 'UPDATE':
            return state.map(course => course._id === payload._id ? payload : course)
        default:
            return state
    }
}
export default coursesReducer