import {Comments, Posts} from "./schemas/models.js";
import {getPost} from "./posts.js";
import {FourOhFourError, NotFoundError} from "../util/Errors.js";

export const createComment = async (post, comment) => {

    const newComment = await Comments.create({
        ...comment,
        post
    });
    await Posts.updateOne({_id: post}, {$push: {comments: newComment._id}});
    return newComment
}
export const removeComment = async (_id) => {

    const comment = await Comments.findById(_id).exec();
    if (comment === null) throw new NotFoundError('Could not find comment to delete')
    await Promise.all([
        Comments.deleteOne({_id}).exec(),
        Posts.updateOne({_id: comment.post}, {$pull: {comments: _id}})]);

}
export const editComment = async (_id, content) => {

    const comment = await Comments.findById(_id).exec();
    if (comment === null) throw new NotFoundError('Could not find comment to delete')
    return await Comments.findOneAndUpdate(
        {_id},
        {content},
        {new: true}
    );


}
export const getComments = async (post, sort = {timestamp: 1}) => {
    try {
        const postResult = await getPost(post, {comments: true})
        if (postResult === null) throw new Error()
        return await Comments.find({post}).sort(sort).exec()
    } catch (e) {
        throw new FourOhFourError(`Post with id ${post} not found.`)
    }

}
