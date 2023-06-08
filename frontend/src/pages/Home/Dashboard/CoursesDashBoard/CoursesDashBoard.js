import './CoursesDashBoard.css'
import useProfile from "../../../user/useProfile";
import DashboardCard from "../DashboardCard/DashboardCard";
import DashboardCourses from "../../DashboardCourses";
    const CoursesDashBoard = ({courses,className=''}) =>

      <DashboardCard className={`CoursesDashboard ${className}`} id={'Dashboard_MyCourses'}>
            <h3 id={'Profile_MyPosts'}>My Courses</h3>
            <DashboardCourses courses={courses}/>
        </DashboardCard>



export default CoursesDashBoard