import './CourseDashboard.css'
import {useCourseContext} from "../../state/contexts/CourseContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "../../util/date-helpers";


const CourseDashboard = ({modalIsVisible: visible, showModal: show}) => {
    const course = useCourseContext()
    if (!course) return null
    return (
        <div id={'Course'}>
            <div className={'course-div  '}>
                <h1 id={'welcome'} >Welcome to {course.courseName}</h1>
                <div className="CourseDashboard_course-attributes">
                    <div>
                        {course.subject} #{course.courseNumber}
                    </div>

                    <span>  Starting {formatDate(course.startDate)}</span>
                    <span>  Until {formatDate(course.endDate)}</span>

                </div>
                {!visible &&
                    <button className={`createPostFAB`} onClick={show}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                }
                {Object.keys(course).join(' ')}
            </div>
        </div>
    )
}
export default CourseDashboard