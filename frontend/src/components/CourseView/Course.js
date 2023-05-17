import {useParams} from "react-router-dom";
import useGet from "../../hooks/useGet";
import PostList from "./Posts/PostList";
import {useModal} from "../General/Modal";
import {CourseContextProvider} from "../../state/contexts/CourseContext";
import {Provider} from "react-redux";
import postsStore from "../../state/redux/postsStore";
import CreatePost from "./CreatePost";
import './Course.css'
import CourseDashboard from "./CourseDashboard";


const Course = () => {
    const {id} = useParams()
    const query = {populate: true}
    const course = useGet('courses', {id, query})
    const [visible, {show, hide}] = useModal()
    return course &&
        <CourseContextProvider course={course}>
            <CourseDashboard modalIsVisible={visible} showModal={show}/>
                <Provider store={postsStore}>
                    {visible&& <CreatePost hide={hide} visible={visible} course={course}/>}

                    <PostList course_id={id}/>
                </Provider>
        </CourseContextProvider>
}
export default Course

