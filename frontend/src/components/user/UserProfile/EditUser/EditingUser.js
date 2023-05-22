import useAxios from "../../../../api";
import useForm from "../../../../hooks/useForm";
import useFlash from "../../../../hooks/useFlash";
import {useGlobalContext} from "../../../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import './EditProfile.css'
import {useEffect, useState} from "react";
import EditProfileForm from "./EditProfileForm";

const EditProfile = ({navigation = true}) => {
    const {put} = useAxios()
    const {username} = useGlobalContext()
    const {get} = useAxios()
    const [user, setUser] = useState(null)
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

    const navigate = useNavigate()
    const [msg, flash] = useFlash('text-danger')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await put(`users/${username}`, '', form)
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
    return <EditProfileForm
        form={form}
        onChange={onChange}
        handleSubmit={handleSubmit}
        flashState={[msg, flash]}
        username={username}
        cancel={() => navigate('/profile')}
    />

}

export default EditProfile
