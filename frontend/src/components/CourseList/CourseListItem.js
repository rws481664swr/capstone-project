import css from './index.css'
import {Link} from "react-router-dom";

const CourseListItem = ({course: {courseName, subject, _id, courseNumber, students,...rest}}) => {

    return <>
        <li className={`${css.courseLi}`}>
            <Link to={`/courses/${_id}`}>
                <div className={css.courseBody}>
                    <div className={css.courseName}>{subject}:#{courseNumber} - {courseName} </div>
                    <div className={css.courseName}>{students.length} Students</div>
                </div>
                <h1>{_id}</h1>
            </Link>
        </li>

    </>
}
export default CourseListItem

