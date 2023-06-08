import './PostsDashboard.css'
import {Provider} from "react-redux";
import PostList from "../../../../components/PostList/PostList";
import MyPost from "../../../../components/MyPosts/MyPost";
import DashboardCard from "../DashboardCard/DashboardCard";
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../../../../state/redux/postsReducer";

const PostsDashboard = ({username,className=''}) => {
    const store =
        configureStore({reducer: postsReducer})
    return(
    <DashboardCard className={`post-card ${className}`} id={'PostCard'}>
        <h3 id={'Profile_MyPosts'}>My Posts</h3>
        <Provider store={store}>
            <PostList
                Post={MyPost}
                url={`posts/users/${username}`}/>
        </Provider>
    </DashboardCard>
)}
export default PostsDashboard