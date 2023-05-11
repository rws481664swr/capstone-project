import {useState} from "react";

const useFlash = (_css='') => {
    const [css, setCss] = useState(_css)
    const [msg, flash] = useState('')
    const toRender=msg ? <span className={css}>{msg}</span> : ''
    return [toRender, flash, setCss]
}

export default useFlash