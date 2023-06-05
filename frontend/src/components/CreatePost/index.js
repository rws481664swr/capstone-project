import useForm from "../../hooks/form/useForm";
import useFlash from "../../hooks/form/useFlash";
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import useAxios from "../../hooks/ajax/useAxios";
import {ADD} from "../../state/actions/actions";
import {useDispatch} from "react-redux";
import Modal from "../General/Modal/Modal";
import {useCallback} from "react";
import './CreatePost.css'
import LabeledInput, {LabeledTextBox} from "../General/LabeledInput/LabeledInput";
import Button from "../General/Button/GenericButton/Button";

const formValidate = ({content, title}, flash, danger) => {
    content = content.trim()
    title = title.trim()
    let bad = false
    let msg = ''
    if (!title) {
        danger()
        msg = 'Title is required'
        bad = true
    }
    if (!content) {
        danger()
        msg = 'Content is required'
        bad = true
    }

    if (!content && !title) {
        danger()
        msg = 'Title and content are required'
        bad = true
    }

    if (bad) {
        danger()
        flash(msg)
    }
    return bad
}

function useSubmitPost(course, form, clear, hide) {
    const dispatch = useDispatch()
    const {post: postRequest} = useAxios()
    const {_id: user, username} = useGlobalContext()
    const [msg, flash, setCss] = useFlash()
    const submit = useCallback(
        async (e) => {
            e.preventDefault()
            const post = {...form, course: course._id, user, username}
            if (formValidate(post, flash, () => setCss('text-danger'))) return
            try {
                setCss('text-success')
                const payload = await postRequest('posts', post)
                dispatch({type: ADD, payload})
                clear()
                hide()
            } catch ({response: {data: {message: err}}}) {
                console.error(err)
                setCss('text-danger')
                return flash(err)
            }
        }
        , [hide, clear, dispatch, form, flash, setCss, username, user, course._id, postRequest])
    return [submit, msg];
}

const CreatePost = ({course, hide}) => {
    const [form, onChange, clear] = useForm({title: '', content: ''})
    const [submit, msg] = useSubmitPost(course, form, clear, hide);
    return <>
        <Modal visible={true} hide={hide}>
            <div>
                <form className={'CreatePost '} onSubmit={submit}>
                    <div className={'CreatePost'}> {msg}</div>
                    <LabeledInput
                        name={'title'}
                        onChange={(e) => {
                            onChange(e)
                        }}
                        label={'Post Title'}
                        id={'input-title'}
                        className={'CreatePost'}
                        value={form.title}
                    />
                    <LabeledTextBox
                        name={'content'}
                        value={form.content}
                        onChange={onChange}
                        label={'Post Content'}
                        id={'input-content'}
                        className={'CreatePost'}/>
                    {/*<label className={'CreatePost '} htmlFor="post-title">Post Title</label>*/}
                    {/*<input id="post-title" className={'CreatePost '}*/}
                    {/*       onChange={onChange} value={form.title}*/}
                    {/*       name={'title'}*/}
                    {/*       type="text"/>*/}

                    {/*<label className={'CreatePost '} htmlFor="post-content">Post Content</label>*/}
                    {/*<textarea id={"post-content"} className={'CreatePost '}*/}
                    {/*          name="content" cols="30" rows="10" value={form.content}*/}
                    {/*          onChange={onChange}></textarea>*/}

                    <Button className={'CreatePost '} type="submit">Post</Button>
                </form>
            </div>
        </Modal>
    </>
}
export default CreatePost