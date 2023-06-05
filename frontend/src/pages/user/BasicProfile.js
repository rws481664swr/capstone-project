import useProfile from "./useProfile";
import {useParams} from "react-router-dom";
import useAxios from "../../hooks/ajax/useAxios";
import UserCard from "./UserProfile/DisplayProfile/sections/UserCard";

import './BasicProfile.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
const BasicProfile = () => {
    const {get} = useAxios()
    const {username} = useParams()
    const user = useProfile(username,get)
    const {username:viewer}=useGlobalContext()
    if (!user) return null

    return <>
        <div className={'BasicProfile_container'}>

          <UserCard viewer={viewer} className={'BasicProfile_UserCard'} user={user}></UserCard>
        </div>
    </>
}
export default BasicProfile