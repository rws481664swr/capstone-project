import useAxios from "../../api";
import {useEffect, useState} from "react";

const useProfile = (username) => {
    const {get} = useAxios()
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