import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import CourseList from "./pages/CourseList";
import Course from './pages/CourseView/Course'
import EditProfile from "./pages/user/UserProfile/EditUser/EditingUser";
import DisplayProfile from "./pages/user/UserProfile/DisplayProfile";
import Admin from './pages/admin/Admin'
import BasicProfile from "./pages/user/BasicProfile";

const App=()=>
    <>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<></>}/>
        <Route path={'/courses'} element={<CourseList/>}/>
        <Route path={'/courses/:id'} element={<Course/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path="/profile/edit" element={<EditProfile/>} />
        <Route path="/profile" element={<DisplayProfile/>} />
        <Route path={'/user/:username'} element={<BasicProfile/>}/>
        <Route path={'/admin/*'} element={<Admin/>}/>
      </Routes>
    </>


export default App;
