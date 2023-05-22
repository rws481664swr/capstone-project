import UserProfileContent from "./UserProfileContent";
import CoursesComponent from "./CoursesComponent";
import '../DisplayProfile.css'

const DisplayProfileContent = ({user, courses}) => {
    return <>
        <UserProfileContent user={user}/>
        <div className={'UserCard User_Courses'}>
            <CoursesComponent courses={courses}/>
        </div>
    </>
}
export default DisplayProfileContent