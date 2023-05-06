import axios from "axios";
import {BASE_URL} from "./config";
import {useGlobalContext} from "./state/contexts/GlobalContext";

export const request = async ({method, resource, id, body, token, query: params = {}}) => {
    const config = {authorization: `Bearer ${token}`, params}
    if (!body)
        return await axios[method](`${BASE_URL}/${resource}/${id || ''}`, config)
    else
        return await axios[method](`${BASE_URL}/${resource}/${id || ''}`, body, config)
}
const useAxios = () => {
    const {token, setToken} = useGlobalContext()
    const config = (query = {}) => ({
        headers: {authorization: `Bearer ${token}`, ['Access-Control-Allow-Origin']: '*'},
        params: query,
        // withCredentials: true
    })
    const getToken = async () => {
        const {data: {token}} = await axios.get(`${BASE_URL}/auth/token`, config())
        setToken(token)
    }

    async function get(resource, id = '', query = {}) {
        const tokenUpdate = getToken()
        const {data, headers} = await axios.get(`${BASE_URL}/${resource}/${id}`, config(query))

        await tokenUpdate
        return data;
    }


    async function post(resource, body) {
        const tokenUpdate = getToken()
        const {data, ...rest} = await axios.post(`${BASE_URL}/${resource}`, body, config())
        await tokenUpdate
        return data
    }

    async function put(resource, id = '', body) {
        const tokenUpdate = getToken()
        const {data, ...rest} = await axios.put(`${BASE_URL}/${resource}`, body, config())
        await tokenUpdate
        return data
    }

    async function delete_(resource, id = '') {
        const tokenUpdate = getToken()
        const {data, ...rest} = await axios.delete(`${BASE_URL}/${resource}/${id}`, config())
        await tokenUpdate
        return data;
    }

    return {post, put, delete: delete_, get}
}
export default useAxios