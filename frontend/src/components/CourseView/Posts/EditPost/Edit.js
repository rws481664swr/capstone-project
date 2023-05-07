import useForm from "../../../../hooks/useForm";
import LabeledInput, {LabeledTextBox} from "../../../General/LabeledInput";
import {useDispatch} from "react-redux";
import useAxios from "../../../../api";

const Edit = ({editMode, post, setEditMode, setPost}) => {
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
        {editMode &&
            <div>
                edit mode
                <LabeledInput
                    id={'edit-title'}
                    label={'Title'}
                    value={form.title}
                    onChange={onChange}
                    className={''}
                    name={'title'}
                />

                <LabeledTextBox
                    id={'edit-content'}
                    label={'Content'}
                    value={form.body}
                    onChange={onChange}
                    className={''}
                    name={'content'}
                />
                <button type="submit">Save</button>
            </div>
        }
    </form>
}
export default Edit