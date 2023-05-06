import {useGlobalContext} from "../../../../state/contexts/GlobalContext";

const Comment=({comment:{_id,post, username, content, timestamp},remove})=>{
    const{username:uname}=useGlobalContext()
    return <>Comment: {content} by {username} on {timestamp} {
        uname===username && <button onClick={()=>remove(_id)}>Delete</button>
    }</>
}
export default Comment
