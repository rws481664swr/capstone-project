import useAxios from "../../../hooks/ajax/useAxios";
import React, {useEffect, useReducer, useState} from "react";
import coursesReducer from "../../../state/redux/coursesReducer";
import './AdminCourses.css'
import Modal, {useModal} from "../../../components/General/Modal/Modal";
import {COURSES_ACTIONS} from '../../../state/actions/actions'
import AdminCourseListItem from "./AdminCourseListItem";

const {INIT, REMOVE} = COURSES_ACTIONS
/**
 * AdminCourses component for administration of courses. It displays a list of all courses.
 */
const AdminCourses = () => {
    const {get, delete: _delete} = useAxios()
    const [coursesList, dispatchCourses] = useReducer(coursesReducer, [])
    useEffect(() => {
        (async () => {


            try {
                const payload = await get('courses')
                dispatchCourses({type: INIT, payload})

            } catch (e) {
                console.error(e)
            }
        })()
    }, [])
    const deleteCourse = async (_id) => {
        try {
            await _delete(`courses/${_id}`)
            dispatchCourses({type: REMOVE, payload: _id})
        } catch (e) {
            console.error(e)
        }
    }
    const [course, setCourse] = useState(null)
    const [
        showing, {
            show,
            hide
        }

    ] = useModal()
    return (
        <>
            {course && <Modal hide={() => {
                hide() || setCourse(null)
            }} visible={showing}>
                <div className="AdminCourse">
                    <div className="AdminCourse_Card">
                        <div>
                            <div>{course.courseName} - {course.courseNumber}</div>
                            <div>id: {course._id}</div>
                        </div>
                    </div>
                </div>
            </Modal>}
            {coursesList.map((course) => (
                <AdminCourseListItem
                    deleteCourse={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteCourse(course._id)
                    }}
                    key={course._id} onClick={
                    () => {
                        setCourse(course)
                        show()
                    }}
                    course={course}/>
            ))}

        </>
    )
}


export default AdminCourses