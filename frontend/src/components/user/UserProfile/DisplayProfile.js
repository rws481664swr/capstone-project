import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import useProfile from "../useProfile";
import {useNavigate} from "react-router-dom";

const DisplayProfile=()=>{
    const {username} = useGlobalContext()
    const user = useProfile(username)
    const navigate  = useNavigate()
    return <>
        {JSON.stringify(user)}
            <button onClick={()=>navigate(`/profile/edit`)}>Edit</button>
    </>
}
export default DisplayProfile