import {useCallback, useState} from "react";
import './Modal.css'

/**
 * Modal is a component that displays a modal.
 */
const Modal = ({visible, hide, children, zIndex = 1}) => <>
    {visible &&
        <div style={{zIndex}} onClick={hide} className={'sr-modal'}>
            {/*<div onClick={hide} className={css.modal}>*/}
            <div onClick={e => e.stopPropagation()}
                 className={'sr-modal_content'}>
                {/*className={css.modal_content}>*/}
                {children}
            </div>
        </div>}

</>

export default Modal

/**
 * useModal is a hook that returns a tuple of two values:
 * a boolean and an object with three functions
 * (show, hide, toggle) that can be used to control the boolean value.
 */
export const useModal = (init = false) => {
    const [showing, setShowing] = useState(init)
    const hide = useCallback(() => setShowing(false), [setShowing])
    const show = useCallback(() => setShowing(true), [setShowing])
    const toggle = useCallback(() => setShowing(showing => !showing), [setShowing])
    return [showing, {
        show,
        hide,
        toggle
    }
    ]
}