import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import jwtDecode from "jwt-decode";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import axios from "axios";
import {BASE_URL} from "../../config";

const value = {
    username: undefined,
    role: undefined,
    _id: undefined,
    timestamp: undefined,
    token:null,
    setToken:()=>{}

}
const GlobalContext = createContext(value)
export default GlobalContext


export const GlobalContextProvider = ({children}) => {
    const [context,setState] =
        useLocalStorageState( 'ctx',value||{})
    const tokenRef= useRef(null)


    const updateContext= useCallback((token)=>{
        if (token){
            tokenRef.current=token
            setState({...jwtDecode(token), token:tokenRef})
        }else{
            setState({})
        }
    },[setState])

   const logout=useCallback (()=> {
        updateContext(null)
    },[updateContext])


    return <GlobalContext.Provider value={{...context,setToken: updateContext,logout}}>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalContext = () =>
    useContext(GlobalContext)

