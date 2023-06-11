import './Dashboard.css'
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import PostsDashboard from "./PostsDashboard/PostsDashboard";
import CoursesDashBoard from "./CoursesDashBoard/CoursesDashBoard";
import useProfile from "../../user/useProfile";

const Dashboard = () => {
    const {username} = useGlobalContext()
    const {courses=[]} = useProfile(username,[],{courses:[]})


    // const courses = user ? user.courses : []
    return (

        <div id={'Dashboard'}>

            <PostsDashboard username={username}/>
            <CoursesDashBoard  courses={courses} username={username}/>
        </div>

    )
}

export default Dashboard