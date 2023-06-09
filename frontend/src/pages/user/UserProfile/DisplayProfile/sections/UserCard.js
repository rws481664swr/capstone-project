import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEdit} from "@fortawesome/free-solid-svg-icons";
import './UserCard.css'

const UserCard = ({user, viewer = user, showEdit, className = ''}) =>
    <div id={"UserCard"} className={className}>
        <div className="Profile_EditLine">
            <h3>{user.username}</h3>
            {viewer === user && <span id={'EditUserButton'}
                                      onClick={showEdit}>
                <FontAwesomeIcon icon={faEdit}/>
            </span>}
            {viewer !== user && <div></div>}
        </div>


        <hr className={'UserCard_Separator'}/>
        <div className={'UserCard_LineItem'}>
            Name:&nbsp;
            {user.first_name} {user.last_name}
        </div>
        <div className={'UserCard_LineItem'}>
            Username:&nbsp;
            {user.username}
        </div>
        <div className={'UserCard_LineItem'}
             id={'BasicUserCard_CopyDiv'}>
            <span>
                Email:&nbsp; {user.email}
            </span>
            {viewer !== user &&
                <span onClick={() => navigator.clipboard.writeText(user.email)}
                      className={'BasicProfile_Copy'}>
                <FontAwesomeIcon icon={faCopy}/>
            </span>
            }</div>
    </div>

export default UserCard