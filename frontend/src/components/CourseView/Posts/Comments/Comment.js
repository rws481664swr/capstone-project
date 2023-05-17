import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import {Link} from "react-router-dom";
import './Comments.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const Comment = ({className = '', comment: {_id, post, username, content, timestamp}, remove}) => {
    const {username: uname} = useGlobalContext()
    return (
        <div className={className}>


                <div className={'Comments_Comment'}>

                    <div className={'Comments_Comment_Text_container'}>
                        {content}
                        {uname === username && <button className={'Comments-delete-button'} onClick={() => remove(_id)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>}

                    </div>
                    <div className={'between'}>
                        <div></div>
                        <div className={'Comments_Commented-By'}>
                            by <Link to={`/users/${username}`}>{username}</Link> on {timestamp}

                        </div>
                    </div>
                </div>

        </div>

    )
}
export default Comment
