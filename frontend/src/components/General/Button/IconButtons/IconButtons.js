import './IconButtons.css';
import {faBan, faEdit, faMapPin, faThumbTack, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export const EditButton = ({className = '', setEditMode, editMode}) =>

    <button className={`${className} EditButton IconButton`}
            onClick={setEditMode}>
        {editMode
            ? <FontAwesomeIcon icon={faBan}/>
            : <FontAwesomeIcon icon={faEdit}/>}
    </button>
export const PinButton = ({className = '', canPin, togglePin, pinned}) =>

    <button className={`${className} PinButton IconButton ${pinned ? 'text-primary':''} `}
            onClick={canPin ? togglePin :()=>{}}>
         <FontAwesomeIcon icon={faThumbTack}/>
    </button>

export const DeleteButton = ({className = '', onClick}) =>
    <button onClick={onClick} className={`${className} DeleteButton IconButton`}>
        <FontAwesomeIcon icon={faTrash}/>
    </button>