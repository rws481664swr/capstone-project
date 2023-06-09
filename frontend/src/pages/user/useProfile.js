import {useEffect, useState} from "react";
import useAxios from "../../hooks/ajax/useAxios";

const useProfile = (username,deps=[],defaultState=null) => {
    const {get} = useAxios()

    const [user, setUser] = useState(defaultState)
    useEffect(() => {
        (async () => {
            try {
                const user = await get(`users/${username}`)
                setUser(user)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [get,username,...deps])
    return user
}

export default useProfile