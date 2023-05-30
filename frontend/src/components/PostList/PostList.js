import PostListItem from './PostListItem'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {SET_STATE} from "../../state/actions/actions";
import useAxios from "../../hooks/useAxios";
import PostDisplay from "../Posts/PostDisplay/PostDisplay";

/*
    * PostList is a component that displays a list of posts
 */
const PostList = ({className='' ,Post,  url}) => {

    const {get} = useAxios()
    const dispatch = useDispatch()

    // get posts for the course
    useEffect(() => {
        (async () => {
            try {
                const payload = await get(url)
                 dispatch({type: SET_STATE, payload})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [dispatch,  get])


    const [postDisplay, setPost] = useState(null)
    const posts = useSelector(e => e)

    return <>
        <div className={`${className}`} >
            {posts && <PostDisplay post={postDisplay} setPost={setPost}/>}
            <ul id={'PostListElement'} data-testid={'PostList'} >
                {posts.map(p =>
                    (<Post
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