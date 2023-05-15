import {useParams} from "react-router-dom";
import useGet from "../../hooks/useGet";
import PostList from "./Posts/PostList";
import {useModal} from "../General/Modal";
import {CourseContextProvider} from "../../state/contexts/CourseContext";
import {Provider} from "react-redux";
import postsStore from "../../state/redux/postsStore";
import CreatePost from "./CreatePost";

const Course = () => {
    const {id} = useParams()
    const query = {populate: true}
    const course = useGet('courses', {id, query})
    const [visible, {show, hide}] = useModal()
    return course &&
        <CourseContextProvider course={course}>
            <div id={'Course'}>
                <div className={'d-flex justify-content-between css.courseHeader'}>
                <div id={'welcome'} >Welcome to {course.courseName}</div>
                    {!visible &&
                        <button id={'postbutton'} className={` createPostButton}`} onClick={show}>
                            Create a post <i className="fa  fa-plus"></i>

                        </button>
                    }
                </div>
                {/*<div>COURSE {id} - {JSON.stringify(course)} </div>*/}
                {Object.keys(course).join(' ')}
                <div>COURSE END</div>
            </div>
            <div>PostList BEGIN</div>
            <div>
                <Provider store={postsStore}>
                    {visible&& <CreatePost hide={hide} visible={visible} course={course}/>}

                    <PostList course_id={id}/>
                </Provider>
            </div>
            <div>PostList END</div>
        </CourseContextProvider>
}
export default Course