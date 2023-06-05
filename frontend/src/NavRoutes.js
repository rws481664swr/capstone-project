import {Route, Routes} from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home/Home";
import CourseList from "./pages/CourseList";
import CreateCourse from "./pages/create-course/CreateCourse";
import Course from "./pages/CourseView/Course/Course";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import EditProfile from "./pages/user/UserProfile/EditUser/EditingUser";
import DisplayProfile from "./pages/user/UserProfile/DisplayProfile";
import BasicProfile from "./pages/user/BasicProfile";
import Join from "./pages/join/Join";
import JoinCourse from "./pages/join/JoinCourse";

const NavRoutes = ({isAdmin}) =>
    <Routes>
        <Route path={'/'} element={<>{isAdmin ? <Admin/> : <Home/>}</>}/>
        <Route path={'/courses'} element={<CourseList/>}/>
        <Route path={'/courses/new'} element={<CreateCourse/>}/>
        <Route path={'/courses/:id'} element={<Course/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path="/profile/edit" element={<EditProfile/>}/>
        <Route path="/profile" element={<DisplayProfile/>}/>
        <Route path={'/user/:username'} element={<BasicProfile/>}/>
        <Route path={'/admin/*'} element={<Admin/>}/>
        <Route path={'/join'} element={<Join/>}/>
        <Route path={'/join/:id'} element={  <Join/>}/>
        <Route path={'*'} element={<h1>404</h1>}/>
    </Routes>

export default NavRoutes