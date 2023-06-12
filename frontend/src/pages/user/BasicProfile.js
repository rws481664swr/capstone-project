import useProfile from "./useProfile";
import {useParams} from "react-router-dom";
import UserCard from "./UserProfile/DisplayProfile/sections/UserCard";

import './BasicProfile.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";

const BasicProfile = () => {
    const {username} = useParams()
    const user = useProfile(username)
    const {username: viewer} = useGlobalContext()
    if (!user) return null

    return <>
        <div className="BasicProfile">
        <div className={'BasicProfile_container'}>

            <UserCard
                viewer={viewer}
                className={'BasicProfile_UserCard'}
                user={user}/>
        </div>
        </div>
    </>
}
export default BasicProfile