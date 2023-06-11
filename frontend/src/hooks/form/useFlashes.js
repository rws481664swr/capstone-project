import React, {useState} from "react";

const ToRender=  ({message,css})=> {
    if(message) return <span className={css}>{message}</span>
    else return null
}
const useFlashes = (obj={},_css='') => {
    const [css, setCss] = useState(_css)
    const [messages, setState] = useState(obj)
    const flash = (object ,css='') => {
        css && setCss(css)
        setState({...object})
    }

   const toRender = Object.keys(messages)
       .map(key=>
        ({[key]: <ToRender key={key} message={messages[key]} css={css}/>})
       ).reduce((acc,curr)=>({...acc,...curr}),{})
    return [toRender, flash, setCss]
}
export default useFlashes
