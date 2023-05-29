import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import useProfile from "../../useProfile";
import './DisplayProfile.css'
import MyPosts from "../../../../components/MyPosts/MyPosts";
import useAxios from "../../../../hooks/useAxios";
import Modal, {useModal} from "../../../../components/General/Modal/Modal";
import EditProfile from "../EditUser/EditingUser";
import UserCard from "./sections/UserCard";
import UserCoursesList from "./sections/UserCoursesList";
import PostDisplay from "../../../../components/Posts/PostDisplay/PostDisplay";
import {useReducer, useState} from "react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../../../../state/redux/postsReducer";
import {composeWithDevTools} from "redux-devtools-extension";


const DisplayProfile = () => {
    const {get} = useAxios()
    const {username} = useGlobalContext()
    const user = useProfile(username, get)
    const {courses} = user || {}
    const [   editProfileModalVisible,editProfileModal] = useModal()
    const [post, setDisplayPost] = useState(null)
     const store =
         configureStore({reducer:postsReducer  })

    if (!user) return <div>Loading...</div>
    return (
        <div id="UserProfile">
            <h1>Profile: {user.username}</h1>
            <Provider store={store}>
            <PostDisplay post={post} setPost={setDisplayPost}/>
            <EditProfileModal hide={editProfileModal.hide} showing={ editProfileModalVisible}/>

            <div className="row">
                <div className="col-4">
                    <UserCard user={user} showEdit={editProfileModal.show}/>
                </div>
                <div className="col-5">
                    <h3>My Posts</h3>

                    <MyPosts  username={username} setPost={setDisplayPost}/>
                </div>
                <div className="col-3"><h3>Courses</h3>
                    <UserCoursesList courses={courses}/>
                </div>
            </div>
            </Provider>
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