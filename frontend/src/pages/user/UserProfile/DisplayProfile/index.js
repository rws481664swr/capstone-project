import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import useProfile from "../../useProfile";
import './DisplayProfile.css'
import useAxios from "../../../../hooks/useAxios";
import Modal, {useModal} from "../../../../components/General/Modal/Modal";
import EditProfile from "../EditUser/EditingUser";
import UserCard from "./sections/UserCard";
import UserCoursesList from "./sections/UserCoursesList";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../../../../state/redux/postsReducer";
import PostList from "../../../../components/PostList/PostList";
import MyPost from "../../../../components/MyPosts/MyPost";
import '../../../../components/MyPosts/MyPosts.css'

const DisplayProfile = () => {
    const {get} = useAxios()
    const {username} = useGlobalContext()
    const user = useProfile(username, get)
    const {courses} = user || {}
    const [   editProfileModalVisible,editProfileModal] = useModal()
    // const [post, setDisplayPost] = useState(null)
     const store =
         configureStore({reducer:postsReducer  })

    if (!user) return <div>Loading...</div>
    return (
        <div id="UserProfile">
            <h1>Profile: {user.username}</h1>
            <EditProfileModal hide={editProfileModal.hide} showing={ editProfileModalVisible}/>

            <div className="row">
                <div className="col-4">
                    <h3 id={"Profile_MyProfile"}>My Profile</h3>

                    <UserCard user={user} showEdit={editProfileModal.show}/>
                </div>
                <div className="col-5">
                    <h3 id={'Profile_MyPosts'}>My Posts</h3>
                    <Provider store={store}>

                        <PostList Post={MyPost} url={`posts/users/${username}`}   /></Provider>
                </div>
                <div className="col-3"><h3 id={'Profile_MyCourses'}>Courses</h3>
                    <UserCoursesList courses={courses}/>
                </div>
            </div>
            {/*</Provider>*/}
        </div>
    )
}
const EditProfileModal = ({showing, hide}) =>
     <Modal
        id={'EditProfileModal'}
        className={''}
        visible={showing}
        hide={hide}>
        <EditProfile onCancel={hide}/>
    </Modal>



export default DisplayProfile