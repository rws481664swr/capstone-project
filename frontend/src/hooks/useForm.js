import {useState} from "react";

const useForm =(form)=>{
    const[state,setState]=useState({...form})
    const onChange=(e)=>{
        const {target:{value,name}}=e
        setState(state=>({...state,[name]:value}))
    }
    const clear = ()=>setState(form)
    return [state,onChange,clear,setState]
}





export default useForm