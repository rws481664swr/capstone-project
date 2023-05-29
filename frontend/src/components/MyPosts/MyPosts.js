import {useEffect, useState} from "react";
import MyPost from "./MyPost";
import './MyPosts.css'
import useAxios from "../../hooks/useAxios";
import {INIT, SET_STATE} from "../../state/actions/actions";
import {useDispatch, useSelector} from "react-redux";

const MyPosts = ({username, setPost}) => {


    const posts = useSelector(e=>e)
    const {get} = useAxios()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const response = await get(`posts/users/${username}`)
                 dispatch({type: SET_STATE, payload: response})

            } catch (e) {
                console.error(e)
            }
        })()
    }, [/*setPosts,*/ username, get])
    if (!posts) return null
    return (
        <>{posts.map((post) => <MyPost
            key={post._id}
            onClick={() => {

            setPost(post)
        }} post={post}/>)}</>)


}

export default MyPosts