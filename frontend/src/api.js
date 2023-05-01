import axios from "axios";
import {BASE_URL} from "./config";
import {useGlobalContext} from "./GlobalContext";
import {useEffect} from "react";
export const request = async ({method,resource, id,body,token,query:params={}})=>{
    const config={authorization: `Bearer ${token}`,params}
    if(!body)
return await axios[method](`${BASE_URL}/${resource}/${id||''}`,config)
    else
        return await axios[method](`${BASE_URL}/${resource}/${id||''}`,body, config)
}
const useAxios =()=> {
    const {token,setToken}= useGlobalContext()
    const config=(query={})=>({
        headers: {authorization: `Bearer ${token}`,['Access-Control-Allow-Origin']:'*'},
        params: query,
        // withCredentials: true
    })

   useEffect(()=>{
       (async ()=>{
           console.log('useEffect ran')
           const {data} = await axios.get(`${BASE_URL}/auth/token`, config())
           setToken(data.token)
       })()
   },[])
    async function get(resource, id = '',  query = {}) {
        const {data,headers} = await axios.get(`${BASE_URL}/${resource}/${id}`,config(query))
        console.log('headers: auth',headers,headers.authorization,headers.Authorization)
        return data;
    }


    async function post(resource, body) {
        const {data,...rest} = await axios.post(`${BASE_URL}/${resource}`, body, config())
        return data
    }

    async function put(resource, id = '', body) {
        const {data,...rest} = await axios.put(`${BASE_URL}/${resource}`, body, config())
        return data
    }

    async function delete_(resource, id = '') {
        const {data,...rest} = await axios.delete(`${BASE_URL}/${resource}/${id}`, config())
        return data;
    }
    return {post,put,delete:delete_,get}
}
export default useAxios