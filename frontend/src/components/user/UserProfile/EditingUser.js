import useAxios from "../../../api";
import useForm from "../../../hooks/useForm";
import useFlash from "../../../hooks/useFlash";
import LabeledInput from "../../General/LabeledInput";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";
import useProfile from "../useProfile";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const {put} = useAxios()
    const {username} = useGlobalContext()

    const user = useProfile(username)

    const [form, onChange, clear, setFormState] = useForm({
        username: user.username,
        email: user.email,
        password: user.password
    })
    const navigate = useNavigate()
    const [msg, flash] = useFlash('text-danger')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await put(`users/${user._id}`, '', form)
            setFormState(payload)
            clear()
            navigate(`/profile`)
        } catch (e) {
            flash(`Something went wrong updating ${user.username}: ${
                e.response ? e.response.data.message : e.message
            }`)
            console.error(e)
        }
    }
    return <>
        <div>{msg}</div>
        <form onSubmit={handleSubmit}>
            <LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Username'}
                name={'username'}
                value={form.username}
                onChange={onChange}
                disabled
            />
            <LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Email'}
                name={'email'}
                value={form.email}
                onChange={onChange}
                type={'email'}
            />
            <LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Password'}
                name={'password'}
                value={form.password}
                onChange={onChange}
                type={'password'}

            />
            <button onClick={()=>navigate('/profile')} type={'button'}>Cancel</button>
            <button type={'submit'}>Save</button>
        </form>
    </>
}

export default EditProfile