import './index.css'
import CourseListItem from "./CourseListItem";
import {useGlobalContext} from "../../GlobalContext";
import {useNavigate} from "react-router-dom";
import useGet from '../../hooks/useGet'


const CourseList = () => {

    const navigate = useNavigate()
    const courses = useGet('courses',{init:[]})
    if (!courses) return navigate('/login') || <>ERROR</>

    return <>{courses.map((clazz, i) =>
        <CourseListItem key={i} clazz={clazz}/>)}
    </>
}
export default CourseList

