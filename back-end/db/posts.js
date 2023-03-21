import {Posts as posts} from './schemas/models.js'
export const createPost = async (post) => {
    return posts.create(post)
}


export const getPosts = async (sort={}) => {
 return await posts.find({}).sort(sort).exec()
}
export const getPostsFromCourse = async (course, sort={}) => {
 return await posts.find({course}).sort(sort).exec()
}
export const getPostsFromUser = async (user, sort={}) => {
 return await posts.find({user}).sort(sort).exec()
}
export const getPinned = async ( sort={}) => {
 return await posts.find({pinned:true}).sort(sort).exec()
}
export const getPost =  async(_id,{user,course}={user:false,course:false}) => {
    if(!user && !course) return await posts.findOne({_id}).exec()


 let populate=''
    if (user){
        populate='user'
    }
    if(course){
        if(populate){
            populate+=' course'
        }else{
            populate='course'
        }
    }

    return await    posts.findOne({_id}).populate(populate).exec()
}


export const updatePost =  async(_id, update) => {
    return await posts.findOneAndUpdate({_id},update).exec()
}


export const deletePost =  async(_id) => {
    return await posts.findOneAndDelete({_id}).exec()

}


export const pinPost =async  (_id) => {
    return await posts.findOneAndUpdate({_id},{pinned:true}).exec()

}


export const unpinPost =  (_id) => {
    return posts.findOneAndUpdate({_id},{pinned:false})

}

