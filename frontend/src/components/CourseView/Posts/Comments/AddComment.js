import {useState} from "react";
import useFlash from "../../../../hooks/useFlash";
const AddComment = ({add}) => {
    const [content, setContent] = useState('')
    const  [toRender, flash, setCss]= useFlash()
    const submit = async (e) => {
        e.preventDefault()
        if(!content.trim()) return flash('Comment is required')
        add(content)
        setContent('')
    }
    return <>
    {toRender}
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