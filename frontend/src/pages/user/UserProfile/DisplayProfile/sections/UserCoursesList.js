import './UserCoursesList.css'
import {useNavigate} from "react-router-dom";

const UserCoursesList = ({courses}) => {
    const navigate = useNavigate()
    return (

        <ul id={'UserCoursesList'}>
            {courses && courses.map(course =>
                <li key={course._id}
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className={'ProfileCourseListItem'}>
                    {course.courseName} {course.subject} #{course.courseNumber}
                </li>
            )}
        </ul>
    )
}
export default UserCoursesList