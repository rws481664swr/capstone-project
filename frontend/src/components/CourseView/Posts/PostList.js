import PostListItem from './PostListItem'
import useGet from "../../../hooks/useGet";

const PostList=({course_id:id})=>{
    const posts = useGet(`posts/courses`,{init:[],id})

    return <>
    <div>
        <ul>
            {posts.map(p=><PostListItem post={p}/>)}
        </ul>
    </div>
    </>
}
export default PostList