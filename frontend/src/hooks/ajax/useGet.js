import {useEffect, useState} from "react";


import useAxios from './useAxios'

/**
 * useGet is a hook that returns the result of a get request to the api
 */
const useGet = (resource, {id = '', init = null, query = null}, onError = () => {
}) => {
    const {get} = useAxios()
    const [state, setState] = useState(init)
    useEffect(() => {
        (async () => {
            try {
                const data = await get(resource, id, query || {});
                setState(data)
            } catch (e) {
                onError(`In request: /${resource} Error: ${e.response.data.message}`)
                console.error(e)
            }
        })()
    }, [resource, id, query])
    return state
}
export default useGet
