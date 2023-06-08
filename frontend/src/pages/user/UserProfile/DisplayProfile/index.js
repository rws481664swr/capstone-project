import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import useProfile from "../../useProfile";
import './DisplayProfile.css'
import Modal, {useModal} from "../../../../components/General/Modal/Modal";
import EditProfile from "../EditUser/EditingUser";
import UserCard from "./sections/UserCard";
import '../../../../components/MyPosts/MyPosts.css'

const DisplayProfile = () => {
    const {username} = useGlobalContext()
    const user = useProfile(username)
    const [editProfileModalVisible, editProfileModal] = useModal()
    // const [post, setDisplayPost] = useState(null)

    if (!user) return <div>Loading...</div>
    return (
        <div id="UserProfile">
            <h1>Profile: {user.username}</h1>

            <EditProfileModal hide={editProfileModal.hide} showing={editProfileModalVisible}/>
            <div className="">
                <h3 id={"Profile_MyProfile"}>My Profile</h3>

                <UserCard user={user} showEdit={editProfileModal.show}/>
            </div>

            {/*</Provider>*/}
        </div>
    )
}

const EditProfileModal = ({showing, hide}) =>
    <Modal
        id={'EditProfileModal'}
        className={''}
        visible={showing}
        hide={hide}>
        <EditProfile onCancel={hide}/>
    </Modal>


export default DisplayProfile