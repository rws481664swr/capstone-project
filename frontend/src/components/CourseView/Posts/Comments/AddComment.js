import {useState} from "react";
import useFlash from "../../../../hooks/useFlash";
import './Comments.css'
import './AddComment.css'
import LabeledInput from "../../../General/LabeledInput";
import Button from "../../../General/Button";
const AddComment = ({add}) => {
    const [content, setContent] = useState('')
    const  [toRender, flash]= useFlash()
    const submit = async (e) => {
        e.preventDefault()
        if(!content.trim()) return flash('Comment is required')
        add(content)
        setContent('')
    }
    return <>
    {toRender}
        <LabeledInput
            id={'add-comment'}
            label={'Comment'}
            value={content}
            onChange={e => setContent(e.target.value)}
            className={'LabeledInput comment'}
            name={'content'}
            />
        <Button id={'add-comment-button'} onClick={submit}>Comment</Button>
    </>
    //TODO
}
export default AddComment