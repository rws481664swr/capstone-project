import {Link, Navigate, NavLink, Route, Routes} from "react-router-dom";
import './Admin.css'
import NewCourse from "./NewCourse/NewCourse";
import AdminCourses from "./AdminCourses/AdminCourses";
import React from "react";
import AdminUsers from "./AdminUsers/AdminUsers";

/**
 * Admin component for administration of users, courses, and posts.
 */
const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>

            <div className="AdminNav">
            <NavLink to={'/admin/courses'}  >Courses</NavLink>
            <NavLink to={'/admin/users'}   >Users</NavLink>
            </div>
              <Link to={ '/admin/courses/new'}> </Link>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/admin/courses'}/>}/>
                <Route path={'courses/new'} element={<NewCourse/>}/>
                <Route path={'courses'} element={<AdminCourses/>}/>
                <Route path={'users'} element={<AdminUsers/>}/>
            </Routes>
        </div>
    )

}
export default Admin

