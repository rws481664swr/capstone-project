import './IconButtons.css';
import React from "react";
import {faBan, faEdit, faMapPin, faThumbTack, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
export const EditButton = React.memo(
    ({className = '', setEditMode, editMode}) =>

    <button
        data-testid={'EditButton'}
        className={`${className} EditButton IconButton`}
            onClick={setEditMode}>
        {editMode
            ? <FontAwesomeIcon icon={faBan}/>
            : <FontAwesomeIcon icon={faEdit}/>}
    </button>)
export const PinButton = React.memo(({className = '', canPin, togglePin, pinned}) => {
    const {role}= useGlobalContext()
    return (
    <button
        data-testid={'PinButton'}
        className={`${className} ${role==="TEACHER"  ? 'pointerOnHover':''} PinButton IconButton ${pinned ? 'text-primary' : ''} `}
        onClick={canPin ? togglePin : () => {
        }}>
        <FontAwesomeIcon icon={faThumbTack}/>
    </button>)
})

export const DeleteButton = React.memo(({className = '', onClick}) =>
    <button
        data-testid={'DeleteButton'}
        onClick={onClick} className={`${className} DeleteButton IconButton`}>
        <FontAwesomeIcon icon={faTrash}/>
    </button>)