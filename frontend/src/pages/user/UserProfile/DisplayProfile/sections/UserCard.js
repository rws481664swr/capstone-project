import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit,faCopy} from "@fortawesome/free-solid-svg-icons";
import './UserCard.css'

const UserCard = ({ user,viewer = user, showEdit, className = ''}) =>
    <div id={"UserCard"} className={className}>
        <div id={'Profile_EditLine'}>
            <div>Name: {user.first_name} {user.last_name}</div>
            {viewer === user && <span id={'EditUserButton'}
                                      onClick={showEdit}>
                <FontAwesomeIcon icon={faEdit}/>
            </span>}
        </div>
        <div>Username: {user.username}</div>
        <div id={'BasicUserCard_CopyDiv'}><span>Email: {user.email}</span>{viewer !== user &&
            <span onClick={()=>navigator.clipboard.writeText(user.email)}  className={'BasicProfile_Copy'}><FontAwesomeIcon icon={faCopy}/></span>
        }</div>
    </div>

export default UserCard