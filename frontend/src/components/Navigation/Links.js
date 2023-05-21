import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {NavLink} from "react-router-dom";

export const Links = () => {
    const {loggedIn, logout, role} = useGlobalContext()
    const isAdmin = loggedIn && role === "ADMIN"

    return (
        <>
            <NavLink to={'/'} className={'link'}>Home</NavLink>
            {!loggedIn && <NavLink className={'link'} to={'/login'}>Log In</NavLink>}
            {!loggedIn && <NavLink className={'link'} to={'/register'}>Register</NavLink>}
            {loggedIn && isAdmin ?
                <NavLink className={'link'} to={'/admin'}>Admin</NavLink>
                :
                <NavLink className={'link'} to={'/courses'}>Courses</NavLink>}

            {loggedIn && <NavLink className={'link'} to={'/profile'}>Profile</NavLink>}
            {loggedIn && <NavLink className={'link'} onClick={logout} to={'/login'}>Log Out</NavLink>}
        </>)
}