import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import useProfile from "../../useProfile";
import './DisplayProfile.css'
import Modal, {useModal} from "../../../../components/General/Modal/Modal";
import EditProfile from "../EditUser/EditingUser";
import UserCard from "./sections/UserCard";
import '../../../../components/MyPosts/MyPosts.css'

const DisplayProfile = () => {
    const {username} = useGlobalContext()

    const [editProfileModalVisible, editProfileModal] = useModal()

    const user = useProfile(username,[editProfileModalVisible])

    if (!user) return <div>Loading...</div>
    return (
        <div id="UserProfile">
            <EditProfileModal hide={editProfileModal.hide} showing={editProfileModalVisible}/>
            <div className="DisplayProfile">

                <UserCard user={user} showEdit={editProfileModal.show}/>
            </div>
        </div>
    )
}

const EditProfileModal = ({showing, hide}) =>
    <Modal
        id={'EditProfileModal'}
        className={''}
        visible={showing}
        hide={hide}>
        <EditProfile onCancel={hide} />
    </Modal>


export default DisplayProfile