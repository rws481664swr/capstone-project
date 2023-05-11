import useAxios from "../../../api";
import useToggle from "../../../hooks/useToggle";
import Modal, {useModal} from "../../General/Modal";
import React, {useCallback} from "react";
import Comments from "./Comments";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import {EditButton, PinButton} from "./EditPost/Buttons";
import Edit from "./EditPost/Edit";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const useDisplayPost = ([post,setPost]) => {
    const axios=useAxios()
    const [visible, {show, hide: hideModal}] = useModal()
    const dispatch = useDispatch()
    const hide = () => {
        setPost(null)
        hideModal()
    }
    const togglePin = async () => {
        try {
            const payload = await axios.put(`posts/${post._id}/pin`)
            dispatch({type:payload.pinned?"PIN":"UNPIN",payload})
            setPost(payload)
        } catch (e) {
            alert(e.response.data.message)
            console.error(e.response.data.message)
        }
    }
    return {togglePin, hide, visible}
}
const PostDisplay = ({post = null, setPost}) => {
    const {get, ...axios} = useAxios()
   const {togglePin, hide, visible}=useDisplayPost([post,setPost])
    const [editMode, setEditMode] = useToggle(false)



    const {role, username: currentUser} =useGlobalContext()
    if(!post) return null

    const editable = currentUser === post.username
    const canPin = role !== "STUDENT"
    return (
        <>
            {post &&
                <Modal visible={post} hide={hide}>
                    <EditButton editable={editable} editMode={editMode} setEditMode={setEditMode}/>
                    <PinButton canPin={canPin} pinned={post.pinned} togglePin={togglePin}/>
                        <div>
                            <div>{post.pinned && 'pinned'}
                                <Link to={`/users/${post.username}`}>{post.username}</Link>
                                posted at {post.createdAt}
                            </div>

                            <h4>{post.title}</h4>

                           <p> {post.content}</p>
                            <div></div>
                            <div></div>
                            <div>{post._id}</div>
                        </div>
                    {/*{JSON.stringify(post)}*/}
                    <Edit editMode={editMode} post={post} setPost={setPost} setEditMode={setEditMode}/>
                   <Comments post={post}/>
                </Modal>
            }
        </>
    )
}
export default PostDisplay
