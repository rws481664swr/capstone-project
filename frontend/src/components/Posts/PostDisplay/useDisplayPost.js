import useAxios from "../../../hooks/ajax/useAxios";
import {useModal} from "../../General/Modal/Modal";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {REMOVE} from "../../../state/actions/actions";

const useDisplayPost = ([post, setPost],setEditMode) => {
    const axios = useAxios()
    const [visible, {hide: hideModal}] = useModal()
    const dispatch = useDispatch()
    const hide = () => {
        setPost(null)
        hideModal()
        setEditMode(false)
        console.log(`hiding modal post`)
    }
    const togglePin = async () => {
        try {
            console.log("toggle pin called")
            const payload = await axios.put(`posts/${post._id}/pin`)
            dispatch({type: payload.pinned ? "PIN" : "UNPIN", payload:{...post,pinned:!post.pinned}})
            console.log(`successfully ${payload.pinned ? "pinned" : "unpinned"} post ${post._id}`)
            setPost(payload)
        } catch (e) {
            console.log(`failed to pin post ${post._id}`)
            alert(e.response.data.message)
            console.error(e.response.data.message)
        }
    }

    const deletePost =async () => {
        try {
            const payload = await axios.delete(`posts/${post._id}`)
            dispatch({type: REMOVE,id: post._id})
            setPost(null)
        } catch (e) {
            console.error(e.response.data.message)
        }
    }
    return {togglePin, hide, visible,deletePost}
}

export default useDisplayPost