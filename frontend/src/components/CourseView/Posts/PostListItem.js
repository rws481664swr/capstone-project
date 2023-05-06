import useToggle from "../../../hooks/useToggle";
import Comments from "./Comments";
import Modal, {useModal} from "../../Modal/Modal";
import {useCallback, useEffect, useReducer} from "react";
import useAxios from "../../../api";
import dayjs from 'dayjs'

const PostListItem = ({post, onClick}) => {

    const date = dayjs(new Date(post.postDate))
    return <li onClick={()=> onClick()}>
        <h4>{post.title}</h4>
        {Object.keys(post).join(' ')}
        {`${date.format(' h:mm A')} on ${date.format('M/DD')}`}
    </li>
}


export default PostListItem