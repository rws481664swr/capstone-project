import './Dashboard/CoursesDashBoard/Dashboard_Courses.css'
import {useNavigate} from "react-router-dom";

const DashboardCourses = ({courses}) => {
    const navigate = useNavigate()
    return (
        <ul id={'DashboardCourses'}>
            {courses && courses.map(course =>
                <li key={course._id}
                    onClick={() => navigate(`/courses/${course._id}`)}
                    className={'DashboardCourseListItem'}>
                    <span>
                        {course.courseName}
                    </span>
                    <span>
                        #{course.courseNumber}
                    </span>
                </li>
            )}
        </ul>
    )
}
export default DashboardCourses