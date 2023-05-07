import PostListItem from './PostListItem'
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState} from "react";
import {SET_STATE} from "../../../state/actions/posts";
import useAxios from "../../../api";
import PostDisplay from "./PostDisplay";

const PostList = ({course_id: id}) => {
    // const posts = useGet(`posts/courses`,{init:[],id})
    const {get} = useAxios()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const payload = await get(`posts/courses/${id}`)
                dispatch({type: SET_STATE, payload})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    const [postDisplay, setPost] = useState(null)
    const posts = useSelector(e => e)
    return <>
        <div>
            {posts && <PostDisplay post={postDisplay} setPost={setPost}/>}
            <ul>
                {posts.map(p =>
                    (<PostListItem onClick={() => setPost(p)} key={p._id} post={p}/>)
                )}
            </ul>
        </div>
    </>
}
export default PostList