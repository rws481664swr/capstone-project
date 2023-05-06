import css from './CourseListItem.css'
import {Link} from "react-router-dom";

const CourseListItem = ({clazz: {courseName, subject,_id}}) => {

    return <>
        <div className={css.outerDiv}>
            <Link className={css.courseLink} to={`/courses/${_id}`}>
            <span className={css.courseName}>{courseName}</span>

            <span className={css.subject}>{subject}</span>
            </Link>
        </div>

    </>
}
export default CourseListItem

