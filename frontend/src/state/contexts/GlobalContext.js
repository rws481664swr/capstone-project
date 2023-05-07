import {createContext, useContext} from "react";
import jwtDecode from "jwt-decode";
import useLocalStorageState from "../../hooks/useLocalStorageState";

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
    const [context,setContext] =
        useLocalStorageState( 'ctx',value||{})
    const setToken= (token)=>{
        if (token){
            const {

                username,
                role,
                _id,
                timestamp
            } = jwtDecode(token)
            setContext({username, role, _id, timestamp, token})
        }else{
            setContext({})
        }
    }
    const logout= ()=> {
        setToken(null)
    }
    return <GlobalContext.Provider value={{...context,setToken,logout}}>
        {children}
    </GlobalContext.Provider>
}
export const useGlobalContext = () =>     useContext(GlobalContext)

