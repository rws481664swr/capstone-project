import useAxios from "../../hooks/useAxios";
import {useEffect, useState} from "react";

const useProfile = (username,get) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const user = await get(`users/${username}`)
                setUser(user)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [get,username])
    return user
}

export default useProfile