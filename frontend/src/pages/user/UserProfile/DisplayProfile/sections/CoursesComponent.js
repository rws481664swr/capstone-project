import {Link} from "react-router-dom";
import '../DisplayProfile.css'
  const CoursesComponent = ({courses}) => {
    if (!courses) return <div>Loading...</div>
    if (courses.length === 0) return <div>No Courses</div>
    return <>
        <h3>Courses</h3>
        <ul>
            {courses.map(course =>
                <li key={course._id}>
                    <Link to={`/courses/${course._id}`}>
                        {course.courseName}
                    </Link>
                </li>
            )}
        </ul>
    </>
}
export default CoursesComponent