import useAxios from "../../../../api";
import useForm from "../../../../hooks/useForm";
import useFlash from "../../../../hooks/useFlash";
import LabeledInput from "../../../General/LabeledInput";
import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import Button from "../../../General/Button";
import './EditProfile.css'
import {useEffect, useState} from "react";

const EditProfile = () => {
    const {put} = useAxios()
    const {username} = useGlobalContext()
    const {get} = useAxios()
    const [user, setUser] = useState(null)
    const [form, onChange, clear, setFormState] =
        useForm({ email:'', password:'',old:''})
    useEffect(() => {
        (async () => {
            try {
                const user = await get(`users/${username}`)
                setUser(user)
                setFormState({ email:user.email||null, password:user.password||null})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [get,username ,setFormState])

    const navigate = useNavigate()
    const [msg, flash] = useFlash('text-danger')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await put(`users/${ username}`, '', form)
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

        <div className="EditProfilePage">
            <form className={`EditProfileForm`} onSubmit={handleSubmit}>
                <LabeledInput
                    className={''}
                    inputClass={''}
                    labelClass={''}
                    label={'Username'}
                    name={'username'}
                    value={username||''}
                    disabled
                />
                <LabeledInput
                    className={''}
                    inputClass={''}
                    labelClass={''}
                    label={'Email'}
                    name={'email'}
                    value={form.email||''}
                    onChange={onChange}
                    type={'email'}
                />
                <LabeledInput
                    className={''}
                    inputClass={''}
                    labelClass={''}
                    label={'Old Password'}
                    name={'old'}
                    value={form.old||''}
                    onChange={onChange}
                    type={'password'}
                />
                <LabeledInput
                    className={''}
                    inputClass={''}
                    labelClass={''}
                    label={'Password'}
                    name={'password'}
                    value={form.password||''}
                    onChange={onChange}
                    type={'password'}
                />
                <div className="EditButtons">
                <Button className={'EditProfileButton Edit-Save'} type={'submit'}>Save</Button>
                <Button className={'EditProfileButton Edit-Cancel'} onClick={() => navigate('/profile')}
                        type={'button'}>Cancel</Button>
                </div>
            </form>
        </div>
    </>
}

export default EditProfile