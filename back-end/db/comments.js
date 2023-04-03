import {Comments, Posts} from "./schemas/models.js";

export const createComment = async (post, comment) => {

    const newComment = await Comments.create({
        ...comment,
        post
    });
    await Posts.updateOne({_id: post}, {$push: {comments: newComment._id}});
    return newComment
}
export const removeComment = async (cid) => {
    const comment = await Comments.findById(cid).exec();
    console.log()
    await Promise.all([
        Comments.deleteOne({_id: cid}).exec(),
        Posts.updateOne({_id: comment.post}, {$pull: {comments: cid}})]);
}
export const editComment = async (_id, content) => {
    await Comments.findOneAndUpdate(
        {_id},
        {content},
        {new: true}
    );


}
export const getComments = async (post, sort = {timestamp: 1}) => {
    return await Comments.find({post}).sort(sort).exec()
}
