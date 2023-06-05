import Timestamp from "../General/Timestamp";
import {useState} from "react";
import DisplayProfile from "../../pages/user/UserProfile/DisplayProfile";

const MyPost = ({post,onClick}) => {

    return(
        <>

    <div onClick={onClick}
         className={'MyPost'} key={post._id}>
        <div className={'MyPostTitle'}>{post.title}</div>
        <div className={'MyPostContent'}>
            {/*{post.content}*/}
           Posted <Timestamp className={'MyPostTimestamp'} date={post.postDate}/>
        </div>
    </div>
        </>
)}
export default MyPost