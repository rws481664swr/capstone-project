import useAxios from "../../../hooks/useAxios";
import useToggle from "../../../hooks/useToggle";
import Modal, {useModal} from "../../General/Modal/Modal";
import React, {useCallback} from "react";
import Comments from "../../Comments";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import {EditButton, PinButton} from "../EditPost/Buttons";
import Edit from "../EditPost/Edit";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import './PostDisplay.css'
import Timestamp from "../../General/Timestamp";

const useDisplayPost = ([post, setPost]) => {
    const axios = useAxios()
    const [visible, {hide: hideModal}] = useModal()
    const dispatch = useDispatch()
    const hide = useCallback(() => {
        setPost(null)
        hideModal()
    }, [setPost, hideModal])
    const togglePin = useCallback(async () => {
        try {
            const payload = await axios.put(`posts/${post._id}/pin`)
            dispatch({type: payload.pinned ? "PIN" : "UNPIN", payload})
            setPost(payload)
        } catch (e) {
            alert(e.response.data.message)
            console.error(e.response.data.message)
        }
    }, [dispatch, post, setPost, axios])
    return {togglePin, hide, visible}
}
const PostDisplay = ({post = null, setPost}) => {
    const {togglePin, hide: hideModal} = useDisplayPost([post, setPost])
    const [editMode, toggleEditMode, setEditMode] = useToggle(false)
    const hide = () => {
        hideModal()
        setEditMode(false)
    }
    const {role, username: currentUser} = useGlobalContext()
    if (!post) return null
    const {
        username,
        title,
        _id,
        pinned,
        content,
        postDate
    } = post

    const editable = currentUser === username
    const canPin = role !== "STUDENT"
    return (
        <Modal className={'PostDisplay'} visible={post} hide={hide}>
            <div className={'split-between'}>

            </div>

            <div className={'PostDisplayHeading'}>
                <h4 className={'PostDisplay-Title'}>{title}</h4>
                <div className="PostDisplay-Buttons">
                    {editable && <EditButton className={'EditButton'}
                                             editable={editable}
                                             editMode={editMode}
                                             setEditMode={toggleEditMode}/>}
                    <PinButton className={'PinButton'}
                               canPin={canPin}
                               pinned={pinned}
                               togglePin={togglePin}/>
                </div>
            </div>
            <>
            <span className={'PostedByOn'}>
                <span> posted by </span>
               <span> <Link to={`/users/${username}`}>
                    {username}
                </Link>
               </span>
                <span className={' PostDisplay-TimeStamp'}> <Timestamp date={postDate}/></span>
            </span>
                <div>{pinned && 'pinned'}</div>

                <p className={'PostDisplay-Content'}> {content}</p>
            </>
            <div test-data={_id}></div>
            {editMode && <Edit editMode={editMode}
                               post={post}
                               setPost={setPost}
                               setEditMode={toggleEditMode}/>}
            <Comments post={post}/>

        </Modal>

    )
}



export default PostDisplay