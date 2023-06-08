import './Navbar.css'
import './SidePanel.css'
import './Dropdown.css'
import {useState} from "react";
import {useGlobalContext} from "../state/contexts/GlobalContext";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Links} from "./Links";
import useToggle from "../hooks/state/useToggle";

const Navbar = () => {
    //TODO  STICK TOP NAVBAR
    const {
        token, loggedIn
    } = useGlobalContext()
    const [open, toggle,setDrawer] = useToggle(false)

    return <>

        <div className="navbar">
            <div className={'bar'}>
                <Links/>
            </div>

            <div id={"hamburger"} onClick={toggle} className={'link openbtn'}>
                <FontAwesomeIcon icon={faBars}/>

            </div>

        </div>
        <div id="sidePanel" style={{width: open ? '100%' : 0}} className={`sidepanel`}>
            <button className="closebtn" onClick={toggle}>&times;</button>
            <Links close={()=>setDrawer(false)}/>
        </div>

    </>
}


export default Navbar

