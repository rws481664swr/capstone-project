import {useGlobalContext} from "../state/contexts/GlobalContext";
import {NavLink} from "react-router-dom";

export const Links = ({close: hideSidePanel}) => {
    const {loggedIn, logout, role} = useGlobalContext()
    const isAdmin = loggedIn && role === "ADMIN"
    const isTeacher = loggedIn && role === "TEACHER"

    return (
        <>


            {loggedIn && !isAdmin &&
                <NavLink to={'/'} onClick={hideSidePanel} className={'link'}>
                    Home
                </NavLink>
            }
            {!loggedIn &&
                <NavLink className={'link'} onClick={hideSidePanel} to={'/login'}>
                    Log In
                </NavLink>
            }{!loggedIn &&
            <NavLink className={'link'} onClick={hideSidePanel} to={'/register'}>
                Register
            </NavLink>
        }
            {loggedIn && isAdmin &&
                <NavLink className={'link'} onClick={hideSidePanel} to={'/admin'}>
                    Admin
                </NavLink>
            }
            {loggedIn && (isAdmin || isTeacher) &&
                <NavLink className={'link'} onClick={hideSidePanel} to={'/courses/new'}>
                    Create a Course
                </NavLink>
            }
            {loggedIn && !isAdmin &&
                <NavLink className={'link'} onClick={hideSidePanel} to={'/courses/all'}>
                    Courses
                </NavLink>
            }
            {loggedIn && !isAdmin &&
                <NavLink className={'link'} onClick={hideSidePanel} to={'/profile'}>
                    Profile
                </NavLink>
            }
            {loggedIn &&
                <NavLink className={'link'} onClick={() => {
                    logout()
                    hideSidePanel()

                }} to={'/login'}>
                    Log Out
                </NavLink>
            }</>)
}


export default Links