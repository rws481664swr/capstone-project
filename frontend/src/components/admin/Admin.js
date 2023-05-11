import {Route, Routes} from "react-router-dom";
import useForm from "../../hooks/useForm";

const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>
            <Routes>
                <Route path={'courses/new'} element={<NewCourse/>}/>
                <Route path={'courses'} element={<h1>Courses</h1>}/>
                <Route path={'users'} element={<h1>Users</h1>}/>

            </Routes>
        </div>
    )

}
const NewCourse = () => {
    const [form,onchange,clear,setFormState] = useForm({
    })
    return (
        <div>
            <h1>New Course</h1>

        </div>
    )
}
export default Admin