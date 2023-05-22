import useAxios from "../../../hooks/useAxios";
import {useEffect, useReducer, useState} from "react";
import coursesReducer from "../../../state/redux/coursesReducer";
import './AdminCourses.css'

/**
 * AdminCourses component for administration of courses. It displays a list of all courses.
 */
const AdminCourses = () => {
    const {get} = useAxios()
    const [courses ,setCourses  ]= useState(null)
    const[coursesList , dispatchCourses]= useReducer(coursesReducer,[])
    useEffect(()=>{(async ()=>{
        if(!courses){
            return
        }
        try{
            const response = await get('courses')
            // setCourses(response)
            dispatchCourses({})

        }catch (e) {
            console.error(e)
        }
    })()},[])
    return(
        <>
        </>
    )
}
export default AdminCourses