import useForm from "../../../../hooks/useForm";
import LabeledInput, {LabeledTextBox} from "../../../General/LabeledInput";
import {useDispatch} from "react-redux";
import useAxios from "../../../../hooks/useAxios";
import './EditPost.css'
import Button from "../../../General/Button";


const Edit = ({  post, setEditMode, setPost}) => {
    const [form, onChange, resetForm] = useForm({
        title: post.title, content: post.content
    })
    const dispatch = useDispatch()
    const {put} = useAxios()
    const updateForm = async () => {
        try {
            await put(`posts/${post._id}`, '', form)
            dispatch({type: 'UPDATE', payload: {...post, ...form}})
            setPost({...post, ...form})
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
                    value={form.body}
                    onChange={onChange}
                    className={'LabeledTextBox'}
                    name={'content'}
                    children={form.content}
                />
                <Button type="submit">Save</Button>
            </div>
    </form>
}
export default Edit