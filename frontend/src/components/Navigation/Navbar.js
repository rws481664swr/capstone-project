import './Navbar.css'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {memo, useState} from "react";
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import useGet from "../../hooks/useGet";
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const Navbar = () => {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const toggle = () =>
        setOpen(e => !e)
    const {token: loggedIn, logout} = useGlobalContext()
    return <>
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className="navbar">
            <Bar>
                    <Links loggedIn={loggedIn} logout={logout}/>
            </Bar>
            <div id={"hamburger"} onClick={toggle} className={'link openbtn'}>
                <i className="fa fa-bars"></i>
                {/*&#9776;*/}
            </div>

        </div>
        <div id="sidePanel" style={{width: open ? '100%' : 0}} className={`sidepanel`}>
            <a href="#" className="closebtn" onClick={toggle}>&times;</a>
            <Links/>
            {/*<div style={{display: 'flex', justifyContent: 'center'}} className="">*/}

            {/*</div>*/}
        </div>

    </>
}
const Bar = ({children,...props}) =>
    <div className={'bar'}>
    {children}
    </div>



export default Navbar


const Links = ({loggedIn, logout}) =>
    <>
        <NavLink to={'/'} className={'link'}>Home</NavLink>
        {!loggedIn && <NavLink className={'link'} to={'/login'}>Log In</NavLink>}
        {!loggedIn && <NavLink className={'link'} to={'/register'}>Register</NavLink>}
        {loggedIn && <NavLink className={'link'} to={'/courses'}>Courses</NavLink>}
        {loggedIn && <NavLink className={'link'} onClick={logout} to={'/login'}>Log Out</NavLink>}
    </>