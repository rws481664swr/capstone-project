import {useCallback, useMemo, useState} from "react";

const useFlash = (_css='') => {
    const [css, setCss] = useState(_css)
    const [msg, setState] = useState('')
    const flash = useCallback((message,css='') => {
        css && setCss(css)
        setState(message)
    }, [setState, setCss])
    const toRender=msg ? <span className={css}>{msg}</span> : ''
    const styledFlashes= useMemo(()=>({
        danger: (msg) => flash(msg,'text-danger'),
        success: (msg) => flash(msg,'text-success')
    } ),[flash])

    return [toRender, flash, setCss, styledFlashes]
}
export default useFlash