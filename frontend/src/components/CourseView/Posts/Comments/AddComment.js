import {useState} from "react";
import useAxios from "../../../../api";

const AddComment = ({add}) => {
    const [content, setContent] = useState('')
    const {post} = useAxios()
    const clear = () => setContent('')
    const submit = async (e) => {
        e.preventDefault()
        add(content)
        clear()
    }
    return <>
        <input
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
        />
        <button onClick={submit}>Comment</button>
    </>
    //TODO
}
export default AddComment