import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import {Link} from "react-router-dom";

const Comment=({comment:{_id,post, username, content, timestamp},remove})=>{
    const{username:uname}=useGlobalContext()
    return <>
        {content} by <Link to={`/users/${username}`}>{username}</Link> on {timestamp} {
        uname===username && <button onClick={()=>remove(_id)}>Delete</button>
    }</>
}
export default Comment
