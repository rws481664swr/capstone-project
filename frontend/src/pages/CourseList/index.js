import './CourseList.css'
import CourseListItem from "./CourseListItem";
import {useNavigate} from "react-router-dom";
import useGet from '../../hooks/ajax/useGet'
import FAB from "../../components/General/Button/FAB/FAB";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import useFlash from "../../hooks/form/useFlash";

const CourseList = ({scroll = false, displayFAB=true}) => {

    const navigate = useNavigate()
    const [
        toRender, flash, , {danger,success}
    ]= useFlash()
    const gottenCourses = useGet('courses', {init: []})
    const [courses, setCourses] = useState(() => gottenCourses)
    useEffect(() => {
        setCourses(gottenCourses)
    }, [gottenCourses])

    const drop = (_id) => (dropCourse) => async event => {
        event.stopPropagation()
        event.preventDefault()

        try {
            await dropCourse()
            setCourses(courses =>
                courses
                    .filter(course => course._id !== _id))

        } catch (e) {
            console.error(e.message)
        }
    }
    return <>
        <div id={'CourseList'} className={`courseListContainer ${scroll && 'course-scroll'}`}>
            {toRender&& <div>{toRender}</div>}
            <div className="CourseList_Container ">
                <ul  className={'  scrollable'}>
                    {courses && courses.map(course =>
                        <CourseListItem drop={     drop(course._id)} onClick={navigate

                        } key={course._id} course={course}/>)}
                </ul>
            </div>
        </div>
        {displayFAB&&<FAB id={'join-fab'} className={'CourseList_add'} onClick={() => navigate('/join')}>
            <FontAwesomeIcon icon={faPlus}/>
        </FAB>}
    </>
}
export default CourseList

