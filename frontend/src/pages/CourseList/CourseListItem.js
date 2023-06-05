import {Link} from "react-router-dom";
import useDropCourse from "../../hooks/ajax/useDropCourse";
import {DeleteButton} from "../../components/General/Button/IconButtons/IconButtons";

const CourseListItem = ({drop,course: {courseName, subject, _id, courseNumber, students, ...rest}}) => {

    const dropCourse= drop(useDropCourse(_id))
    return(

        <li className={`CourseListItem`}>
                <Link to={`/courses/${_id}`}>
                    <div className={'CourseListItem_Body'}>
                        <div>
                            <div>{subject}:#{courseNumber} - {courseName} </div>
                            <div>{students.length} Students</div>
                        </div>
                        <div>
                             <DeleteButton onClick={dropCourse}/>
                        </div>
                    </div>
                </Link>
        </li>
)


}
export default CourseListItem

