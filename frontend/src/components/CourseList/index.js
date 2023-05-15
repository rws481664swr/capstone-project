import './index.css'
import CourseListItem from "./CourseListItem";
import {useNavigate} from "react-router-dom";
import useGet from '../../hooks/useGet'
import './index.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useEffect} from "react";

const useDebug= () => {
    const{username:id}=useGlobalContext()
    const user = useGet('users', {init: null, id})
    useEffect(() => {
    if (user) {
        console.log('user: ', user)
        console.log(user.courses.map(e => e.toString()))
    }
    alert('using hook useDebug')
}, [user])
}
const CourseList = () => {
    useDebug()


    const navigate = useNavigate()
    const courses = useGet('courses', {init: []})
    if (!courses) return navigate('/login') || <>ERROR</>

    return <>
        <div id={'CourseList'} className={ 'courseListContainer'}>
            <ul className={'CourseList'}>
                {courses.map(course  =>
                <CourseListItem key={course._id} course={course}/>)}
            </ul>
        </div>
    </>
}
export default CourseList

