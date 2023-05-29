import './CourseList.css'
import CourseListItem from "./CourseListItem";
import {useNavigate} from "react-router-dom";
import useGet from '../../hooks/useGet'
import FAB from "../../components/General/FAB/FAB";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const CourseList = ({scroll=false}) => {

    const navigate = useNavigate()
    const courses = useGet('courses', {init: []})
    // if (!courses) return navigate('/login') || <>ERROR</>

    return <>
        <div id={'CourseList'} className={ `courseListContainer ${scroll && 'course-scroll'}`}>
            <ul className={'CourseList'}>
                {courses.map(course  =>
                <CourseListItem key={course._id} course={course}/>)}
            </ul>
        </div>
        <FAB id={'join-fab'}  className={'CourseList_add'} onClick={()=>navigate('/join')}>
            <FontAwesomeIcon icon={faPlus}   />
        </FAB>
    </>
}
export default CourseList

