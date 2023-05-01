import {useGlobalContext} from "../GlobalContext";

const useToken=()=>{
    const{token}= useGlobalContext()
    return token
}
export default useToken