import useAxios from "../../../../hooks/ajax/useAxios";
import useForm from "../../../../hooks/form/useForm";
import useFlash from "../../../../hooks/form/useFlash";
import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import './EditProfile.css'
import {useEffect, useState} from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfile = ({navigation = true,onCancel}) => {
    const {put,get} = useAxios()
    const {username} = useGlobalContext()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [msg, flash] = useFlash('text-danger')

    const [form, onChange, clear, setFormState] =
        useForm({email: '', password: '', old: ''})

    useEffect(() => {
        (async () => {
            try {
                const user = await get(`users/${username}`)
                setUser(user)
                setFormState({email: user.email || null, password: user.password || null})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [get, username, setFormState])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await put(`users/${username}`, '', form)
            setFormState(payload)
            clear()
            navigate(`/profile`)
            onCancel()
        } catch (e) {
            flash(`Something went wrong updating ${user.username}: ${
                e.response ? e.response.data.message : e.message
            }`)
            console.error(e)
        }
    }
    return <EditProfileForm
        form={form}
        onChange={onChange}
        handleSubmit={handleSubmit}
        flashState={[msg, flash]}
        username={username}
        editingUser={username}
        cancel={onCancel}
    />

}

export default EditProfile
