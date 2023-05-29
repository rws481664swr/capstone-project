import useForm from "../../../hooks/useForm";
import LabeledInput, {LabeledTextBox} from "../../General/LabeledInput/LabeledInput";
import {useDispatch, useSelector} from "react-redux";
import useAxios from "../../../hooks/useAxios";
import './EditPost.css'
import Button from "../../General/Button/Button";
import {UPDATE} from "../../../state/actions/actions";
import {useCallback} from "react";


const Edit = ({  post, setEditMode, setPost}) => {
    const [form, onChange, resetForm] = useForm({
        title: post.title, content: post.content
    })
    const store = useSelector(e=>e)

    const dispatch = useDispatch()
    const {put} = useAxios()
    const updateForm =async (e)  => {
        e.preventDefault()

        try {
            await put(`posts/${post._id}`, '', form)
            console.log("UPDATED")

            dispatch({type: UPDATE , payload: {...post, ...form,id:post._id}})
            setPost({...post, ...form})
            console.log("UPDATED 2")
            setEditMode(false)
            resetForm()
        } catch (e) {
            console.error(e)
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