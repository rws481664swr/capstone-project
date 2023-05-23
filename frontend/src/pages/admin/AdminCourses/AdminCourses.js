import useAxios from "../../../hooks/useAxios";
import {useEffect, useReducer, useState} from "react";
import coursesReducer from "../../../state/redux/coursesReducer";
import './AdminCourses.css'
import {INIT} from "../../../state/actions/actions";

/**
 * AdminCourses component for administration of courses. It displays a list of all courses.
 */
const AdminCourses = () => {
    const {get} = useAxios()
    const [courses, setCourses] = useState(null)
    const [coursesList, dispatchCourses] = useReducer(coursesReducer, [])
    useEffect(() => {
        (async () => {
            console.log('getting courses')

            try {
                const payload = await get('courses')
                // setCourses(response)
                dispatchCourses({type: INIT, payload})
                console.log(payload)

            } catch (e) {
                console.error(e)
            }
        })()
    }, [])
    return (
        <>
            <h1>Admin Courses</h1>
            {coursesList.map((course) => (
                <AdminCourseListItem course={course}/>
            ))}
        </>
    )
}
const AdminCourseListItem = ({course: {_id, courseName, courseNumber}}) =>
    <div key={_id} className="AdminCourse">
        <div className="AdminCourse_CourseCard">
            <div>
                <div>{courseName} - {courseNumber}</div>
                <div>id: {_id}</div>
            </div>
        </div>
    </div>
export default AdminCourses