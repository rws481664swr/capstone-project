import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const AdminCourseListItem = ({deleteCourse,onClick,course: {_id, courseName, courseNumber}}) => {



    return <>
        <div className="AdminCourse">

            <div onClick={onClick} className="AdminCourse_Card">

                <div>

                    <div>{courseName} - {courseNumber}</div>
                    <div>id: {_id}</div>
                </div>
                     <span className={'AdminCourse_DeleteButton'}
                           onClick={deleteCourse}>
                         <FontAwesomeIcon icon={faX}/>
                     </span>
             </div>

        </div>
    </>
}
export default AdminCourseListItem