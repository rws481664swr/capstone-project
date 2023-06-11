import {DeleteButton} from "../../../components/General/Button/IconButtons/IconButtons";
import './AdminCourses.css'

const AdminCourseListItem = ({deleteCourse,onClick,course: {_id, courseName, courseNumber}}) => {



    return <>
        <div className="AdminCourse">

            <div onClick={onClick} className="AdminCourse_Card">

                <div>

                    <div>{courseName} - {courseNumber}</div>
                    <div>id: {_id}</div>
                </div>
                     <DeleteButton onClick={deleteCourse}/>
             </div>

        </div>
    </>
}
export default AdminCourseListItem