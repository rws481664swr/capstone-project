import {createContext, useCallback, useContext, useRef} from "react";
import jwtDecode from "jwt-decode";
import useLocalStorageState from "../../hooks/state/useLocalStorageState";

const value = {
    username: undefined,
    role: undefined,
    _id: undefined,
    timestamp: undefined,
    token: null,
    loggedIn: false,
    setToken: () => {
    }

}
const GlobalContext = createContext(value)
export default GlobalContext


export const GlobalContextProvider = ({children}) => {
    const token = useRef(null)
    const [context, setState] =
        useLocalStorageState('ctx', {token, loggedIn: false})

    const updateContext = useCallback((newToken) => {
        if (newToken) {
            token.current = newToken
            setState({...jwtDecode(newToken), loggedIn: true, token})
        } else {
            token.current = null
            setState({loggedIn: false})
        }
    }, [setState])

    const logout = useCallback(() => {
        token.current = null
        updateContext(null)
    }, [updateContext])


    return <GlobalContext.Provider value={{...context, setToken: updateContext, logout}}>
        {children}
    </GlobalContext.Provider>
}

export const useGlobalContext = () =>
    useContext(GlobalContext)

