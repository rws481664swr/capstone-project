import useProfile from "./useProfile";
import {useParams} from "react-router-dom";

const BasicProfile = () => {
    // const navigate  = useNavigate()
    const {username} = useParams()
    const user = useProfile(username)

    if (!user) return null

    return <>
        <div>

            {JSON.stringify(user)}
        </div>
    </>
}
export default BasicProfile