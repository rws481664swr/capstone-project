import AddComment from "./AddComment";
import Comment from './Comment'
const Comments = ({comments}) => {
    return <>
        <div>
            {comments.map(c => <Comment comment={c}/>)}
            <AddComment/>
        </div>
    </>
}
export default Comments
