import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useGet from "../../hooks/useGet";
import PostList from "./Posts/PostList";
import {useGlobalContext} from "../../GlobalContext";
import useAxios from "../../api";

const Course =({})=>{
    const {id}= useParams()
    const course=useGet('courses',{id,query: {populate:true}})

    return <>
        <div>COURSE BEGIN</div>
        <div>COURSE  {id} - { JSON.stringify(course)} </div>
        <div>COURSE END</div>
        <div>PostList BEGIN</div>
        <div>
            <PostList course_id={id}/>
        </div>
        <div>PostList END</div>

    </>
}
export default Course