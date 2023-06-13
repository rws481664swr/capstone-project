import './App.css';
import Navbar from "./Navigation/Navbar";
import {useGlobalContext} from "./state/contexts/GlobalContext";
import NavRoutes from "./Navigation/NavRoutes";

const App = () => {
    const {role,loggedIn} = useGlobalContext()
    return (
        <>
            <Navbar/>
           <NavRoutes isAdmin={role === "ADMIN"} loggedIn={loggedIn}/>
        </>
    )
}
export default App;
