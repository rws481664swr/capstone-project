import {useState} from "react";
import useForm from "../../../hooks/useForm";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import useAxios from "../../../api";
import {ADD} from "../../../state/actions/posts";
import {useDispatch} from "react-redux";
import Modal from "../../Modal/Modal";

const useFlash = () => {
    const [css, setCss] = useState('')
    const [msg, flash] = useState('')
    return [msg ? <span className={css}>{msg}</span> : '', flash, setCss]
}

function useSubmitPost(course, form, clear,hide) {
    const dispatch = useDispatch()

    const axios = useAxios()
    const {_id: user, username} = useGlobalContext()
    const [msg, flash, setCss] = useFlash()
    const submit = async (e) => {
        e.preventDefault()
        const danger = () => setCss('text-danger')
        const post = {...form, course: course._id, user, username}
        if (!post.title.trim()) {
            danger()
            return flash('Title is required')
        }
        if (!post.content.trim()) {
            danger()
            return flash('Content is required')
        }
        setCss('text-success')
        const payload = await axios.post('posts', post)
        dispatch({type: ADD, payload})
        clear()
        hide()
    }
    return [submit, msg];
}

const CreatePost = ({course, visible, hide}) => {
    const [form, onChange, clear] = useForm({title: '', content: ''})
    const [submit, msg] = useSubmitPost(course, form, clear,hide);
    return <>
        <Modal visible={visible} hide={hide}>
            <form className={'CreatePost '} onSubmit={submit}>
                <div className={'CreatePost'}> {msg}</div>
                <label className={'CreatePost '} htmlFor=""></label>
                <input className={'CreatePost '} onChange={onChange} value={form.title}
                       name={'title'}
                       type="text"/>

                <label className={'CreatePost '} htmlFor=""></label>
                <textarea className={'CreatePost '} name="content" id="" cols="30" rows="10" value={form.content}
                          onChange={onChange}></textarea>

                <button className={'CreatePost '} type="submit">Post</button>
            </form>
        </Modal>
    </>
}
export default CreatePost