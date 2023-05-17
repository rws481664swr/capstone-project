import AddComment from "./AddComment";
import Comment from './Comment'
import React, {useCallback, useEffect, useReducer} from "react";
import {REMOVE} from "../../../../state/actions/posts";
import useAxios from "../../../../api";
import commentsReducer from "../../../../state/redux/commentsReducer";
import useToggle from "../../../../hooks/useToggle";
import './Comments.css'
const useCommentsReducer = (post) => {

    const [comments, dispatch] = useReducer(commentsReducer, [])
    const axios = useAxios()

    useEffect(() => {
        (async () => {
            if (!post) return
            const payload = await axios.get(`comments`, post._id)
            console.log(payload, typeof payload, Array.isArray(payload))
            dispatch({type: "SET_STATE", payload})
        })()
    }, [post, dispatch])
    const add =useCallback (async (content) => {
        const payload = await axios.post('comments', {
            post: post._id,
            content
        },[dispatch,axios])
        dispatch({type: "ADD_COMMENT", payload})
    },[dispatch,axios])
    const remove = useCallback( async (id) => { //TODO
        await axios.delete('comments', id)
        dispatch({type: REMOVE, id})
    },[dispatch,axios])
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
        {!commentsVisible&&
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
