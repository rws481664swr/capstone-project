import {useCallback, useState} from "react";
import './Modal.css'

/**
 * Modal is a component that displays a modal.
 */
const Modal = ({id,visible, hide, children, zIndex = 1,className=''}) => <>
    {visible &&
        <div onClick={hide} style={{zIndex}} className={`sr-modal`}>
            <div
                id={id}
                onClick={e => e.stopPropagation()}
                 style={{zIndex}}
                 className={`${className} sr-modal_content`}>
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