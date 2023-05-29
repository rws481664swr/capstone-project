import {useParams} from "react-router-dom";
import useGet from "../../../hooks/useGet";
import PostList from "../../../components/PostList/PostList";
import {useModal} from "../../../components/General/Modal/Modal";
import {Provider} from "react-redux";
import postsStore from "../../../state/redux/postsStore";
import CreatePost from "../../../components/CreatePost";
import './Course.css'
import CourseDashboard from "./CourseDashboard";
import {useMemo} from "react";
import { useSearchParams } from "react-router-dom";


const Course = () => {
    const {id} = useParams()
    const query = useMemo(
        ()=>({populate: true}),[])
    const course = useGet('courses', {id, query})
    const [visible, {show, hide}] = useModal()

    return course &&
        <div className="sr-container Course_Container">

            <CourseDashboard modalIsVisible={visible} showModal={show} course={course}/>
                <Provider store={postsStore}>
                    {visible &&
                        <CreatePost

                            hide={hide}
                            visible={visible}
                            course={course}/>
                    }

                    <PostList course_id={id}/>
                 </Provider>

        </div>
}
export default Course

