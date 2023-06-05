import AddComment from "./AddComment";
import Comment from './Comment'
import React, {useEffect, useReducer} from "react";
import {REMOVE} from "../../state/actions/actions";
import useAxios from "../../hooks/ajax/useAxios";
import commentsReducer from "../../state/redux/commentsReducer";
import useToggle from "../../hooks/state/useToggle";
import './Comments.css'

function useComments(post, dispatch) {


}

const useCommentsReducer = (post) => {

    const [comments, dispatch] = useReducer(commentsReducer, [])
    const axios = useAxios()

    useEffect(() => {
        (async () => {
            if (!post) return
            console.log('POSTID', post._id)
            const payload = await axios.get(`comments/${post._id}`)
            dispatch({type: "SET_STATE", payload})
        })()
    }, [post, dispatch])

    const add = async (content) => {

        const payload = await axios.post('comments', {
            post: post._id,
            content
        }, [dispatch, axios])
        dispatch({type: "ADD_COMMENT", payload})
    }
    const remove = async (id) => {
        await axios.delete(`comments/${id}`)
        dispatch({type: "REMOVE_COMMENT", id})
    }

    return [comments, add, remove]
}
const Comments = ({post}) => {
    const [commentsVisible, toggleComments] = useToggle()
    const [comments, add, remove] = useCommentsReducer(post)
    if (!post) return null
    return <>
        <div>
         <span className={'PostDisplay-ShowComments'}
               onClick={toggleComments}>
                        {commentsVisible ? 'Show' : 'Hide'}
             &nbsp;Comments
                    </span>
        </div>
        {!commentsVisible &&
            <div className={'Comments-CredentialsContainer'}>
                {comments.length > 0
                    ?
                    comments.map(c =>
                        <Comment key={c._id}
                                 comment={c}
                                 remove={() => remove(c._id)}/>)

                    : 'No Comments'}
                <AddComment add={add}/>
            </div>}
    </>
}
export default Comments
