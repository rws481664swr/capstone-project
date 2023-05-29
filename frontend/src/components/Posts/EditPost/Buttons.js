import {faBan, faEdit, faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const EditButton = ({className = '', setEditMode, editMode}) =>

    <button className={className}
            onClick={setEditMode}>
        {editMode
            ?       <FontAwesomeIcon icon={faBan} />
            : <FontAwesomeIcon icon={faEdit}/>}
            </button>
export const PinButton = ({className = '', canPin, togglePin, pinned}) =>
    canPin &&
    <button className={className} onClick={togglePin}>
        {pinned ? 'unpin' : 'pin'}
    </button>

