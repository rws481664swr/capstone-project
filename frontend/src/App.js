import './App.css';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import CourseList from "./pages/CourseList";
import Course from './pages/CourseView/Course/Course'
import EditProfile from "./pages/user/UserProfile/EditUser/EditingUser";
import DisplayProfile from "./pages/user/UserProfile/DisplayProfile";
import Admin from './pages/admin/Admin'
import BasicProfile from "./pages/user/BasicProfile";
import useForm from "./hooks/useForm";
import LabeledInput from "./components/General/LabeledInput/LabeledInput";
import Button from "./components/General/Button/Button";
import useAxios from "./hooks/useAxios";
import Home from "./pages/Home/Home";
const App = () =>
    <>
        <Navbar/>
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/courses'} element={<CourseList/>}/>
            <Route path={'/courses/:id'} element={<Course/>}/>
            <Route path={'/register'} element={<Register/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path="/profile/edit" element={<EditProfile/>}/>
            <Route path="/profile" element={<DisplayProfile/>}/>
            <Route path={'/user/:username'} element={<BasicProfile/>}/>
            <Route path={'/admin/*'} element={<Admin/>}/>
            <Route path={'/join'} element={<Join/>}/>
            <Route path={'*'} element={<h1>404</h1>}/>
        </Routes>
    </>
const Join = () => {
    const {post} = useAxios()

    const [
        form,
        onChange,
        clear
    ] = useForm(
        {course_id: undefined}
    )
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log('submitting')
        console.log(form)
        try{
            const response = await post('courses/TODO', form)//TODO: implement
            clear()
        }catch (e) {
            console.error(e.message)

        }
        throw new Error('TODO: implement')
    }
    return (
        <div>
            <h1>Join A Course</h1>
            <form className={'sr-container'} onSubmit={onSubmit}>
                <LabeledInput
                    name={'course_id'}
                    value={form.course_id}
                    onChange={onChange}
                    label={'Course ID'}
                    id={'input-course_id'}
                />
                <Button type={'submit'}>Join</Button>
            </form>
        </div>
    )
}

export default App;
