import {useGlobalContext} from "./GlobalContext";
import axios from "axios";
import {BASE_URL} from "./config";

const useRequest=(route='')=>{
    const{token}=useGlobalContext()
    const config = {headers:`Bearer ${token}`}
    const factory= (route)=>
        ({
        get:(id='',config)=>{
            return axios.get(`${BASE_URL}/${route}/${id||''}`,config)
        },
        put:(id,body,config)=>{
            return axios.put(`${BASE_URL}/${route}/${id}`,config)
        },
        post:(body,config)=>{
            return axios.post(`${BASE_URL}/${route}/`,config)
        },
        delete:(id,config)=>{
            return axios.delete(`${BASE_URL}/${route}/${id}`,config)
        }
    })
    return route? factory(route) : factory
}
