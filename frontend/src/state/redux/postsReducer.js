import {ADD, PIN, REMOVE, SET_STATE, UNPIN, UPDATE} from "../actions/actions";


function postsReducer(posts = [], {type, payload, id}) {
    // console.log('reducer ran action', type, id? 'with id': 'without id', 'with payload'/*, payload*/)

     switch (type) {
        case ADD:

             return [payload, ...posts]
        case UPDATE:




            return posts.map(post =>
                post._id !== payload._id
                    ?  post
                    : {...post,content:payload.content, title: payload.title})

        case REMOVE:
            return posts.filter(post => post._id !== id)
        case PIN:
            return posts.map(post => post._id !== id ? post : {...post, pinned: true})

        case UNPIN:
            return posts.map(post => post._id !== id ? post : {...post, pinned: false})
        case SET_STATE:
            return payload

        default:
            return posts
    }
}

export default postsReducer