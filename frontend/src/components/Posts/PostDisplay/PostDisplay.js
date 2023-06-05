import './PostDisplay.css'
import useToggle from "../../../hooks/state/useToggle";
import Modal from "../../General/Modal/Modal";
import React from "react";
import Comments from "../../Comments";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import {DeleteButton, EditButton, PinButton} from "../../General/Button/IconButtons/IconButtons";
import Edit from "../EditPost/Edit";
import {Link} from "react-router-dom";
import Timestamp from "../../General/Timestamp";
import useDisplayPost from "./useDisplayPost";


const PostDisplay = ({post = null, setPost}) => {
    const [editMode, toggleEditMode, setEditMode] = useToggle(false)
    const {togglePin, hide, deletePost} = useDisplayPost([post, setPost],setEditMode)

    console.log(`rendering post display`)
    const PostButtons = ({editable,editMode, canPin, pinned, togglePin, toggleEditMode, deletePost}) =>
        <div className="PostDisplay-Buttons">

            <PinButton className={'PinButton'}
                       canPin={canPin}
                       pinned={pinned}
                       togglePin={togglePin}/>
            {editable && <>
                <EditButton className={'EditButton'}
                            editable={editable}
                            editMode={editMode}
                            setEditMode={toggleEditMode}/>

            </>}
            {editMode &&
                <DeleteButton className={`DeleteButton`}
                              onClick={deletePost
                                  // () => setDeleteConfirmation(true)
                              }/>
            }

        </div>
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
    console.log(`Post id: ${_id}`)
    const editable = currentUser === username
    const canPin = role !== "STUDENT"
    return (

        <Modal className={'PostDisplay'} visible={post} hide={hide}>
            <div className={'split-between'}></div>
            <div className={'PostDisplayHeading'}>
                <h4 className={'PostDisplay-Title'}>{title}</h4>
                <PostButtons
                    editable={editable}
                    canPin={canPin}
                    pinned={pinned}
                    togglePin={togglePin}
                    toggleEditMode={toggleEditMode}
                    deletePost={deletePost}
                    editMode={editMode}
                />
            </div>

            <PostedByOn username={username} postDate={postDate}/>
            <hr/>
            <p className={'PostDisplay-Content'}> {content}</p>

           <Edit editMode={editMode}
                               post={post}
                               setPost={setPost}
                               setEditMode={toggleEditMode}/>
            {post && !editMode && <Comments post={post}/>}

        </Modal>

    )
}

const PostedByOn = ({username, postDate}) =>
    <span className={'PostedByOn'}>
        <span> posted by </span>
           <span>
               <Link to={`/users/${username}`}>
                    {username}
                </Link>
           </span>
            <span className={' PostDisplay-TimeStamp'}>
                <Timestamp date={postDate}/>
            </span>
    </span>


export default PostDisplay
