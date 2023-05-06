import useAxios from "../../../api";
import useToggle from "../../../hooks/useToggle";
import Modal, {useModal} from "../../Modal/Modal";
import {useCallback, useEffect, useReducer} from "react";
import Comments from "./Comments";
import commentsReducer from "../../../state/redux/commentsReducer";
const PostDisplay = ({post = null, setPost}) => {

    const {get} = useAxios()
    const [commentsVisible, toggleComments] = useToggle()
    const [visible, {show, hide: hideModel}] = useModal()
    const hide = useCallback(() => {
        setPost(null)
        hideModel()
    }, [hideModel, setPost])

    return (
        <>
            {post &&
                <Modal visible={post} hide={hide} >
                    {JSON.stringify(post)}
                    <div>
                    <span
                        onClick={toggleComments}>
                        {commentsVisible ? 'Show ' : 'Hide'}
                        Comments
                    </span>
                    </div>
                    {!commentsVisible &&
                        <Comments post={post}/>
                    }
                </Modal>
            }
        </>
    )
}
export default PostDisplay