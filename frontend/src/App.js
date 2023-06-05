import './App.css';
import Navbar from "./Navigation/Navbar";
import {useGlobalContext} from "./state/contexts/GlobalContext";
import NavRoutes from "./NavRoutes";

const App = () => {
    const {role} = useGlobalContext()
    return (
        <>
            <Navbar/>
           <NavRoutes isAdmin={role === "ADMIN"}/>
        </>
    )
}
export default App;
