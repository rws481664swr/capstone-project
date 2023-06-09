import useForm from "../../../hooks/form/useForm";
import LabeledInput, {LabeledTextBox} from "../../General/LabeledInput/LabeledInput";
import {useDispatch, useSelector} from "react-redux";
import useAxios from "../../../hooks/ajax/useAxios";
import './EditPost.css'
import Button from "../../General/Button/GenericButton/Button";
import {UPDATE} from "../../../state/actions/actions";
import {useCallback} from "react";


const Edit = ({  post, setEditMode, setPost,editMode}) => {
    console.log(post)
    const [form, onChange, resetForm] = useForm({
        title: post.title, content: post.content
    })

    const dispatch = useDispatch()
    const {put} = useAxios()
    if(!editMode)return null;
    const updateForm =async (e)  => {
        e.preventDefault()

        try {
            await put(`posts/${post._id}`, '', form)
            dispatch({type: UPDATE , payload: {...post, ...form,id:post._id}})
            setPost({...post, ...form})
            setEditMode(false)
            resetForm()
        } catch (err) {
            console.error(err)
        }
    }

    return <form onSubmit={updateForm}>
            <div>
                <LabeledInput
                    id={'edit-title'}
                    label={'Title'}
                    value={form.title}
                    onChange={onChange}
                    className={'LabeledInput'}
                    name={'title'}
                />

                <LabeledTextBox
                    id={'edit-content'}
                    label={'Content'}
                    value={form.content}
                    onChange={onChange}
                    className={'LabeledTextBox'}
                    name={'content'}
                 />
                <Button  onClick={(e)=> updateForm(e)} >Save</Button>
            </div>
    </form>
}
export default Edit