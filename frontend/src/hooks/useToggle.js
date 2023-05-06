import {useState} from "react";

const useToggle=(val=true)=>{
    const [state,setState]=useState(val)
    const toggle=()=>setState(state=>!state)
    return [state,toggle,setState]
}
export default useToggle