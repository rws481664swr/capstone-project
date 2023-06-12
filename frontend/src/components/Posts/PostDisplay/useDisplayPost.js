import useAxios from "../../../hooks/ajax/useAxios";
import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {REMOVE} from "../../../state/actions/actions";

const useDisplayPost = ([post, setPost], setEditMode) => {
    const axios = useAxios()
    const dispatch = useDispatch()
    return useMemo(
        () => ({
            togglePin: async () => {
                try {
                    await axios.put(`posts/${post._id}/pin`)
                    const payload = {...post, pinned: !post.pinned}
                    dispatch({type: payload.pinned ? "PIN" : "UNPIN", payload: payload})
                    setPost(payload,`setPost called in memo`)
                } catch (e) {
                    console.error(e.response.data.message)
                }
            },

            deletePost: async () => {
                try {
                    const payload = await axios.delete(`posts/${post._id}`)
                    dispatch({type: REMOVE, id: post._id})
                    setPost(null,`setPost called in memo`)
                } catch (e) {
                    console.error(e.response.data.message)
                }
            }
        }), [post ,setPost, dispatch, axios, setEditMode])
}

export default useDisplayPost