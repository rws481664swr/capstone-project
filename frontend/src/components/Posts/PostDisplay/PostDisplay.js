import './PostDisplay.css'
import useToggle from "../../../hooks/state/useToggle";
import Modal, {useModal} from "../../General/Modal/Modal";
import React from "react";
import Comments from "../../Comments";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import {DeleteButton, EditButton, PinButton} from "../../General/Button/IconButtons/IconButtons";
import Edit from "../EditPost/Edit";
import {Link} from "react-router-dom";
import Timestamp from "../../General/Timestamp";
import useDisplayPost from "./useDisplayPost";
import {memo} from "react";

const PostDisplay = ({post = null, setPost}) => {
    const {role, username: currentUser} = useGlobalContext()

    const [editMode, toggleEditMode, setEditMode] = useToggle(false)
    const {togglePin, deletePost} = useDisplayPost([post, setPost],setEditMode)

    const hide= () => {
        setPost(null)
        setEditMode(false)
    }

    console.log(`rendering post display`)

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

        <Modal  className={'PostDisplay'} visible={post} hide={hide}>
            <div className={'split-between'}></div>
            <div  data-testid={'PostDisplay-Heading'} className={'PostDisplayHeading'}>
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

const PostedByOn = memo(({username, postDate}) =>
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
    </span>)

const PostButtons = ({editable,editMode, canPin, pinned, togglePin, toggleEditMode, deletePost}) =>
    <div
        className="PostDisplay-Buttons">

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
                          onClick={deletePost}/>
        }

    </div>
export default PostDisplay
