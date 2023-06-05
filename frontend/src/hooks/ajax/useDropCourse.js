import {useGlobalContext} from "../../state/contexts/GlobalContext";
import useAxios from "./useAxios";

const useDropCourse=(_id,username=null)=>{
    const {username:user}= useGlobalContext()
    if(!username)username = user
    const axios = useAxios()
    return  () =>
         axios.delete(`courses/${_id}/users/${username}`)

}
export default useDropCourse