import {ADD, PIN, REMOVE, SET_STATE, UNPIN, UPDATE} from "../actions/posts";


function postsReducer(posts = [], {type, payload, id}) {
    switch (type) {
        case ADD:
            return [...posts, payload]
        case UPDATE:
            return posts.map(post => post._id !== id ? post : payload)

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