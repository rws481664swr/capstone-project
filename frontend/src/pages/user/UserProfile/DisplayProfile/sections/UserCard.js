import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import './UserCard.css'
const UserCard = ({user, showEdit}) =>
    <div id={"UserCard"}>
        <div id={'Profile_EditLine'}>
            <div>Name: {user.first_name} {user.last_name}</div>
            <span id={'EditUserButton'}
                  onClick={showEdit}>
                <FontAwesomeIcon icon={faEdit}/>
            </span>
        </div>
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>
    </div>
export default UserCard