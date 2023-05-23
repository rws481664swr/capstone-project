import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import useProfile from "../../useProfile";
import {useNavigate} from "react-router-dom";
import FAB from "../../../../components/General/FAB/FAB";
import './DisplayProfile.css'
import './DisplayProfile.css'
import DisplayProfileContent from "./sections/DisplayProfileContent";

const DisplayProfile = () => {
    const {username} = useGlobalContext()
    const user = useProfile(username)
    const navigate = useNavigate()

    const {courses, __v, ...basicInfo} = user || {}

    return (
        <div className={'ProfilePage sr-container'}>
            <DisplayProfileContent user={{...basicInfo,...user}} courses={courses}/>
            <FAB id={'EditProfile_EditFab'} onClick={ () => navigate(`/profile/edit`)}>
                Edit
            </FAB>
        </div>
    )
}
export default DisplayProfile