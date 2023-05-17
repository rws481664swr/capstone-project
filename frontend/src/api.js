import axios from "axios";
import {BASE_URL} from "./config";
import {useGlobalContext} from "./state/contexts/GlobalContext";
import {useCallback, useEffect, useMemo} from "react";

const useAxios = () => {

    const {token:tokenRef} = useGlobalContext()

    useEffect(() => {
        (async () => {
            const {data: {token: newToken}} = await axios.get(`${BASE_URL}/auth/token`,
                {headers: {authorization: `Bearer ${tokenRef.current}`}})
            tokenRef.current= newToken

        })()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const config = useCallback((query = {}) => ({
        headers: {authorization: `Bearer ${tokenRef.current}`, 'Access-Control-Allow-Origin': '*'},
        params: query,
    }),[tokenRef])


   return useMemo (

       ()=> {
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
       },[config])

}
export default useAxios