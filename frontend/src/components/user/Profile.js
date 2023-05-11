import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useParams} from "react-router-dom";
import BasicProfile from "./BasicProfile";
import DisplayProfile from "./UserProfile/DisplayProfile";


const Profile = () => {
    const {username: uparam} = useParams()

    const {username, _id, role} = useGlobalContext()
    console.log('username', username, 'uparam', uparam)
    return uparam === username
        ? <DisplayProfile username={username}/>
        : <BasicProfile username={uparam}/>
}


export default Profile
