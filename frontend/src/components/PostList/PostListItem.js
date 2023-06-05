import dayjs from 'dayjs'
import './PostListItem.css'
import Timestamp from "../General/Timestamp";

const PostListItem = ({post, onClick ,showPostContent=false}) => {
     const date = dayjs(new Date(post.postDate))
    const dateStr=`${date.format(' h:mm A')} on ${date.format('M/DD')}`
    return <li className={'PostListItem'} onClick={onClick}>
        <h4>{post.title}</h4>


      <span className={'PostListItem-subtitle'}>
          Posted by {post.username} <Timestamp/>
      </span>

    </li>
}


export default PostListItem