import useForm from "../../../hooks/useForm";
import useFlash from "../../../hooks/useFlash";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import useAxios from "../../../api";
import {ADD} from "../../../state/actions/posts";
import {useDispatch} from "react-redux";
import Modal from "../../General/Modal";
import {useCallback} from "react";


function useSubmitPost(course, form, clear, hide) {
    const dispatch = useDispatch()
    const {post:postRequest} = useAxios()
    const {_id: user, username} = useGlobalContext()
    const [msg, flash, setCss] = useFlash()
    const submit = useCallback(
    async (e) => {
        e.preventDefault()
        const danger = () => setCss('text-danger')
        const post = {...form, course: course._id, user, username}
        console.log('post', post)
        if (!post.content.trim() && !post.title.trim()) {
            danger()
            return flash('Title and content are required')
        }
        if (!post.title.trim()) {
            danger()
            return flash('Title is required')
        }
        if (!post.content.trim()) {
            danger()
            return flash('Content is required')
        }
        try{
            setCss('text-success')
            const payload = await postRequest('posts', post)
            dispatch({type: ADD, payload})
            clear()
            hide()
        }catch ({response:{data:{message:err}}}) {
            console.error(err)
            setCss('text-danger')
            return flash(err)
        }
    }
    , [hide,clear,dispatch,form,flash,setCss,username,user, course._id]) // eslint-disable-line react-hooks/exhaustive-deps
    return [submit, msg];
}

const CreatePost = ({course, hide}) => {
    const [form, onChange, clear] = useForm({title: '', content: ''})
    const [submit, msg] = useSubmitPost(course, form, clear, hide);
    return <>
        <Modal visible={true} hide={hide}>
            <form className={'CreatePost '} onSubmit={submit}>
                {course._id}
                <div className={'CreatePost'}> {msg}</div>
                <label className={'CreatePost '} htmlFor="post-title">Post Title</label>
                <input id="post-title" className={'CreatePost '}
                       onChange={onChange} value={form.title}
                       name={'title'}
                       type="text"/>

                <label className={'CreatePost '} htmlFor="post-content">Post Content</label>
                <textarea id={"post-content"} className={'CreatePost '}
                          name="content" cols="30" rows="10" value={form.content}
                          onChange={onChange}></textarea>

                <button className={'CreatePost '} type="submit">Post</button>
            </form>
        </Modal>
    </>
}
export default CreatePost