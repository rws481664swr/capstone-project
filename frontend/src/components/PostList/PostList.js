import PostListItem from './PostListItem'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {SET_STATE} from "../../state/actions/actions";
import useAxios from "../../hooks/useAxios";
import PostDisplay from "../Posts/PostDisplay/PostDisplay";

/*
    * PostList is a component that displays a list of posts
 */
const PostList = ({course_id: id}) => {

    const {get} = useAxios()
    const dispatch = useDispatch()

    // get posts for the course
    useEffect(() => {
        (async () => {
            try {
                const payload = await get(`posts/courses/${id}`)
                 dispatch({type: SET_STATE, payload})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [dispatch, id, get])


    const [postDisplay, setPost] = useState(null)
    const posts = useSelector(e => e)

    return <>
        <h4 className={'PostList_Header'}>Posts</h4>
        <div className={'PostList  sr-container'} >
            {posts && <PostDisplay post={postDisplay} setPost={setPost}/>}
            <ul  data-testid={'PostList'} >
                {posts.map(p =>
                    (<PostListItem
                        onClick={() => setPost(p)}
                        key={p._id}
                        post={p}
                    />)
                )}
            </ul>
        </div>
    </>
}


export default PostList