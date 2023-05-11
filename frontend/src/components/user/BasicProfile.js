import useProfile from "./useProfile";
import {useNavigate} from "react-router-dom";

const BasicProfile = ({username}) => {
    const user = useProfile(username)
    const navigate  = useNavigate()

    if (!user) return null

    return <>
        <div>
            {JSON.stringify(user)}
        </div>
    </>
}
export default BasicProfile