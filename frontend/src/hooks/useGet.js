import {useEffect, useState} from "react";


import useAxios from '../api'

/**
 * useGet is a hook that returns the result of a get request to the api
 */
const useGet = (resource, {id = '', init = null, query = null}) => {


    const {get} = useAxios()
    const [state, setState] = useState(init)
    useEffect(() => {
        (async () => {
            const data = await get(resource, id, query || {});
            setState(data)
        })()
    }, [resource, id]) // eslint-disable-line react-hooks/exhaustive-deps
    return state
}
export default useGet
