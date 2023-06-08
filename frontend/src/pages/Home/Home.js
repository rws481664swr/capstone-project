import './Home.css'
import Dashboard from "./Dashboard/Dashboard";
import Admin from "../admin/Admin";
import {Navigate} from "react-router-dom";
import Login from "../authentication/Login";

const Home = ({loggedIn,isAdmin}) => {
    if(!loggedIn)return <Login to={'/login'}/>
    // test special case of user first
    if(isAdmin)return <Admin/>
    // must be regular user at this point
    return <Dashboard/>
}
export default Home