import './index.css'
import CourseListItem from "./CourseListItem";
import {useNavigate} from "react-router-dom";
import useGet from '../../hooks/useGet'
import './index.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useEffect} from "react";

const CourseList = () => {

    const navigate = useNavigate()
    const courses = useGet('courses', {init: []})
    if (!courses) return navigate('/login') || <>ERROR</>

    return <>
        <div id={'CourseList'} className={ 'courseListContainer'}>
            <ul className={'CourseList'}>
                {courses.map(course  =>
                <CourseListItem key={course._id} course={course}/>)}
            </ul>
        </div>
    </>
}
export default CourseList

