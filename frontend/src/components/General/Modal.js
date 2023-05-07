
import {useState} from "react";
// import css from './Modal.css'
import  './Modal.css'

const Modal = ({visible,hide,children, zIndex=1}) => <>
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

export const useModal =(init=false)=>{
    const [showing,setShowing]= useState(init)
    const hide=()=> setShowing(false    )
    const show=()=>setShowing(true)
    const toggle=()=>setShowing(showing=>!showing)
    return [showing,{
        show,
        hide,
        toggle}
    ]
}