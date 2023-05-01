import useToggle from "../../../hooks/useToggle";
import Comments from "./Comments";

const PostListItem = ({post}) => {
    const [comments, toggleComments] = useToggle()

    return <li>
        {post._id}
        <div>
            <h4>POST</h4>
            {JSON.stringify(post)}
            <span onClick={toggleComments}>{comments ? 'Hide' : 'Show'} Comments</span>
            {comments && <Comments comments={post.comments}/>}
        </div>
    </li>
}



export default PostListItem