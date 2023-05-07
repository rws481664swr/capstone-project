
export const EditButton = ({className = '', editable, setEditMode,editMode}) =>
    editable && <button className={className} onClick={setEditMode}>{editMode?"Cancel":'Edit Post'}</button>
export const PinButton = ({className = '', canPin, togglePin, pinned}) =>
    canPin && <button className={className} onClick={togglePin}>{pinned ? 'unpin' : 'pin'}</button>

