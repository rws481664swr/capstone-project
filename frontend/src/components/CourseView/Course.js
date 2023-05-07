import {useParams} from "react-router-dom";
import useGet from "../../hooks/useGet";
import PostList from "./Posts/PostList";
import Modal, {useModal} from "../General/Modal";
import {CourseContextProvider} from "../../state/contexts/CourseContext";
import {Provider} from "react-redux";
import postsStore from "../../state/redux/postsStore";
import useToggle from "../../hooks/useToggle";
import CreatePost from "./CreatePost";

const Course = ({}) => {
    const {id} = useParams()
    const course = useGet('courses', {id, query: {populate: true}})
    const [visible, {show, hide}] = useModal()
    return course &&
        <CourseContextProvider course={course}>
            <div className={'Course'}>
                {!visible && <button onClick={show}>Create a post</button>}

            <div>COURSE BEGIN</div>
            {/*<div>COURSE {id} - {JSON.stringify(course)} </div>*/}
            {Object.keys(course).join(' ')}
            <div>COURSE END</div></div>
            <div>PostList BEGIN</div>
            <div>
                <Provider store={postsStore}>
                    <CreatePost hide={hide} visible={visible} course={course}/>

                    <PostList course_id={id}/>
                </Provider>
            </div>
            <div>PostList END</div>
        </CourseContextProvider>
}
export default Course