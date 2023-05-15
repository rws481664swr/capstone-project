import axios from "axios";
import {BASE_URL} from "./config";
import {useGlobalContext} from "./state/contexts/GlobalContext";
import {useEffect} from "react";

export const request = async ({method, resource, id, body, token, query: params = {}}) => {
    const config = {authorization: `Bearer ${token}`, params}
    if (!body)
        return await axios[method](`${BASE_URL}/${resource}/${id || ''}`, config)
    else
        return await axios[method](`${BASE_URL}/${resource}/${id || ''}`, body, config)
}
/*
* useAxios is a hook that returns a set of functions to make requests to the api
 */
const useAxios = () => {


    const {token:tokenRef} = useGlobalContext()

    useEffect(() => {
        (async () => {
            const {data: {token: newToken}} = await axios.get(`${BASE_URL}/auth/token`,
                {headers: {authorization: `Bearer ${tokenRef.current}`}})
            tokenRef.current = newToken
            // setToken(newToken)
        })()
    }, [])


    const config = (query = {}) => ({
        headers: {authorization: `Bearer ${tokenRef.current}`, 'Access-Control-Allow-Origin': '*'},
        params: query,
    })


    async function get(resource, id = '', query = {}) {
        const {data} = await axios.get(`${BASE_URL}/${resource}/${id}`, config(query))

        return data;
    }


    async function post(resource, body) {
        const {data} = await axios.post(`${BASE_URL}/${resource}`, body, config())
        return data
    }

    async function put(resource, id = '', body) {
        const {data} = await axios.put(`${BASE_URL}/${resource}`, body, config())
        return data
    }

    async function delete_(resource, id = '') {
        const {data} = await axios.delete(`${BASE_URL}/${resource}/${id}`, config())
        return data;
    }


    return {post, put, delete: delete_, get}

}
export default useAxios