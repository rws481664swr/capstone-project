import axios from "axios";
import {BASE_URL} from "../../config";
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useCallback, useEffect, useMemo} from "react";

const dateIsLessThanOneMinuteOld = (date) => {
    const now = new Date()
    const then = new Date(date)
    const diff = (now.getTime() - then.getTime()) / 1000
    return diff < 60
}

const NETWORK_ERROR = 'ERR_NETWORK'
const useAxios = () => {

    const {token:tokenRef,timestamp} = useGlobalContext()

    useEffect(() => {

        (async () => {
            if(dateIsLessThanOneMinuteOld(timestamp))return //do not need to refresh token
            const {data: {token: newToken}} = await axios.get(`${BASE_URL}/auth/token`,
                {headers: {authorization: `Bearer ${tokenRef.current}`}})
            tokenRef.current= newToken

        })()
    }, [ ]) // eslint-disable-line react-hooks/exhaustive-deps


    const config = useCallback((query = {}) => ({
        headers: {authorization: `Bearer ${tokenRef.current}`, 'Access-Control-Allow-Origin': '*'},
        params: query,
    }),[tokenRef])


   return useMemo (
       ()=> {

           async function get(resource, id = '', query = {}) {
               try {

                   const {data} =    await axios.get(`${BASE_URL}/${resource}/${id}`, config(query))
                   return data;

               }catch (e) {
                   if (e.code===NETWORK_ERROR){

                       return alert(`Site is down.`)
                   }
                   throw e
               }
           }

           async function post(resource, body) {
               try {
                   const {data} = await axios.post(`${BASE_URL}/${resource}`, body, config())
                   return data
               }catch (e) {
                   if (e.code===NETWORK_ERROR){
                       return alert(`Site is down.`)
                   }
                   throw e
               }
           }

           async function put(resource, id = '', body) {
               try {
                    const {data} = await axios.put(`${BASE_URL}/${resource}`, body, config())
                   return data
               }catch (e) {
                   if (e.code===NETWORK_ERROR){
                       return alert(`Site is down.`)
                   }
                   throw e
               }
           }

           async function delete_(resource, id = '') {
               try {
                   const {data} = await axios.delete(`${BASE_URL}/${resource}/${id}`, config())
                   return data;
               }catch (e) {
                 console.error(e)
                   if (e.code===NETWORK_ERROR){
                       return alert(`Site is down.`)
                   }
                   throw e
               }
           }

           return {post, put, delete: delete_, get}
       },[config])
}
export default useAxios