import {useEffect, useState} from "react";
import {useGlobalContext} from "../state/contexts/GlobalContext";
import axios from "axios";
import {BASE_URL} from "../config";


import useAxios from '../api'

const useGet=(resource, {id = '',init=null,query={}})=>{

    const {get }= useAxios()
    const [state, setState] = useState(init)
    useEffect(()=>{(async()=>{
        const data = await get(resource, id, query);
        setState(data)
    })()},[resource])
    return state
}
export default useGet
