import {useCallback, useState} from "react";

const useFlash = (_css='') => {
    const [css, setCss] = useState(_css)
    const [msg, flash] = useState('')
    const toRender=msg ? <span className={css}>{msg}</span> : ''
    const danger =  useCallback(() => setCss('text-danger'),
        [setCss])
    const success = useCallback(   () => setCss('text-success'),
        [setCss])
    return [toRender, flash, setCss, {danger, success}]
}

export default useFlash