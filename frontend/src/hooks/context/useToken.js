import {useGlobalContext} from "../../state/contexts/GlobalContext";

const useToken=()=>{
    const{token}= useGlobalContext()
    return token
}
export default useToken