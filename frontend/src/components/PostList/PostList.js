import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {SET_STATE} from "../../state/actions/actions";
import useAxios from "../../hooks/ajax/useAxios";
import PostDisplay from "../Posts/PostDisplay/PostDisplay";
import useToggle from "../../hooks/state/useToggle";
import './PostList.css'
/*
    * PostList is a component that displays a list of posts
 */
const PostList = ({ Post, url, showPostContent = false}) => {
    const [postDisplay, setPost] = useState(null)
    const [collapsed, toggleCollapsed] = useToggle(false)
    const posts = usePostList(url)
console.log('rendering PostList')
    return <>
        {posts && <PostDisplay post={postDisplay} setPost={setPost}/>}

        <ul className={'PostList'} id={''} data-testid={'PostList'}>
            {posts.map(p =>
                <Post
                    onClick={() => setPost(p)}
                    key={p._id}
                    post={p}
                    showContent={showPostContent}
                />
            )}
        </ul>
    </>

        /*<div style={{overflowY: 'scroll'}} className={`PostList ${className}`}>*/
        /*<div className={` collapsible-list ${collapsed ? 'collapsed' : ''}`}>*/
        /*    {showCollapse && <button className={'collapse-button'}*/
        /*             onClick={toggleCollapsed}>{collapsed ? 'Show Posts' : 'Hide Posts'}</button>}*/


        /*</div>*/
        /*</div>*/

}
const usePostList = (url) => {
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
    }, [dispatch, get])
    return useSelector(e => e)
}

export default PostList