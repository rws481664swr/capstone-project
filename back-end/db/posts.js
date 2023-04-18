import {Posts} from './schemas/models.js'

export const createPost = async (post) => {
    return Posts.create(post)
}


const postDate = -1

export const getPosts = async (sort = {postDate}) => {
    const posts = await Posts.find({}).sort(sort).exec()
    return posts
}
export const getPostsFromCourse = async (course, sort = {postDate}) => {
    return await Posts.find({course}).sort(sort).exec()
}
export const getPostsFromUser = async (username, sort = {postDate}) => {
    return await Posts.find({username}).sort(sort).exec()
}
export const getPinned = async (sort = {postDate}) => {
    return await Posts.find({pinned: true}).sort(sort).exec()
}
export const getPost = async (_id, {user, course,comments}={}) => {

    let query = Posts.findById(_id)
    if (user) query = query.populate('user')
    if (course) query = query.populate('course')
    if (comments) query = query.populate('comments')
    return await query.exec()

}


export const updatePost = async (_id, update) => {
    return await Posts.findOneAndUpdate({_id}, update).exec()
}


export const deletePost = async (_id) => {
    return await Posts.findOneAndDelete({_id}).exec()

}


export const pinPost = async (_id) => {
    return await Posts.findOneAndUpdate({_id}, {pinned: true}).exec()

}


export const unpinPost = (_id) => {
    return Posts.findOneAndUpdate({_id}, {pinned: false})

}

