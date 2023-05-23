import {faBan, faEdit, faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditButton = ({className = '', editable, setEditMode, editMode}) =>
    editable &&
    <button className={className}
            onClick={setEditMode}>
        {editMode
            ?       <FontAwesomeIcon icon={faBan} />
            /*<i className="fa-solid fa-ban"/>*/
            : <FontAwesomeIcon icon={faEdit}/>}
            </button>
export const PinButton = ({className = '', canPin, togglePin, pinned}) =>
    canPin &&
    <button className={className} onClick={togglePin}>
        {pinned ? 'unpin' : 'pin'}
    </button>

