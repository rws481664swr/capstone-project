import useProfile from "./useProfile";
import {useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const BasicProfile = () => {
    const {get} = useAxios()
    const {username} = useParams()
    const user = useProfile(username,get)

    if (!user) return null

    return <>
        <div>

            {JSON.stringify(user)}
        </div>
    </>
}
export default BasicProfile