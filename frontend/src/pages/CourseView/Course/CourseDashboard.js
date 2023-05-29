import './CourseDashboard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "../../../util/date-helpers";
import {Link} from "react-router-dom";
import FAB from "../../../components/General/FAB/FAB";


const CourseDashboard = ({modalIsVisible: visible, showModal: show, course}) => {
    if (!course) return null
    const {teachers} = course
    return (
        <div id={'Course'}>
            <div className={'course-div  '}>
                <h1 id={'welcome'}>Welcome to {course.courseName}</h1>
                <div className="CourseDashboard_course-attributes">
                    <div>
                        {course.subject} #{course.courseNumber}
                    </div>

                    <span>  Starting {formatDate(course.startDate)}</span>
                    <span>  Until {formatDate(course.endDate)}</span>

                </div>
                {!visible &&
                    <FAB id={'addPostFAB'} onClick={show} className={''}>
                            <FontAwesomeIcon icon={faPlus}/>
                    </FAB>

                }
            </div>
            <div id="CourseTeachers">
                <h4 id={'Dashboard_Teachers_Heading '}>Teachers</h4>
                <div className={'course-div Dashboard_Teachers_Container'}>

                    {teachers.map(({username}) =>
                        <span key={username} className={'Dashboard_TeacherLink'}> <Link
                            to={`/users/${username}`}
                            key={username}>
                             {username}
                     </Link></span>)}

                </div>
            </div>

        </div>
    )
}
export default CourseDashboard