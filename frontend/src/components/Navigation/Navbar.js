import './Navbar.css'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useGlobalContext} from "../../state/contexts/GlobalContext";
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const Navbar = () => {
    const [open, setOpen] = useState(false)
    const toggle = () =>
        setOpen(e => !e)
    return <>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className="navbar">
            <div className={'bar'}>
                <Links/>
            </div>

            <div id={"hamburger"} onClick={toggle} className={'link openbtn'}>
                <i className="fa fa-bars"></i>
                {/*&#9776;*/}
            </div>

        </div>
        <div id="sidePanel" style={{width: open ? '100%' : 0}} className={`sidepanel`}>
            <button className="closebtn" onClick={toggle}>&times;</button>
            <Links/>
            {/*<div style={{display: 'flex', justifyContent: 'center'}} className="">*/}

            {/*</div>*/}
        </div>

    </>
}


export default Navbar


const Links = () => {
    const {token: loggedIn, logout} = useGlobalContext()
    return (
        <>
            <NavLink to={'/'} className={'link'}>Home</NavLink>
            {!loggedIn && <NavLink className={'link'} to={'/login'}>Log In</NavLink>}
            {!loggedIn && <NavLink className={'link'} to={'/register'}>Register</NavLink>}
            {loggedIn && <NavLink className={'link'} to={'/courses'}>Courses</NavLink>}
            {loggedIn && <NavLink className={'link'} to={'/profile'}>Profile</NavLink>}
            {loggedIn && <NavLink className={'link'} onClick={logout} to={'/login'}>Log Out</NavLink>}
        </>)
}