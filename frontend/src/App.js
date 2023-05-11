import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import CourseList from "./components/CourseList";
import Course from './components/CourseView/Course'
import Profile from "./components/user/Profile";
import EditProfile from "./components/user/UserProfile/EditingUser";
import DisplayProfile from "./components/user/UserProfile/DisplayProfile";
import Admin from './components/admin/Admin'

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
        <Route path="/profile" element={<Profile/>} />
        <Route path={'/profile'} element={<DisplayProfile/>}/>
        <Route path={'/user/:username'} element={<Profile/>}/>
        <Route path={'/admin/*'} element={<Admin/>}/>
      </Routes>
    </>

export default App;
