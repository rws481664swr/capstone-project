import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useEffect, useState} from "react";
import useAxios from "../../api";
import useToggle from "../../hooks/useToggle";
import useForm from "../../hooks/useForm";

const Profile = () => {
    const {username, _id, role} = useGlobalContext()
    const {get} = useAxios()
    const [user, setUser] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const user = await get(`users/${username}`)
                setUser(user)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])
    const [state, onChange, clear, setFormState] = useForm({})
    const [editing, toggle] = useToggle(false)
    if (!user) return null

    return <>
        <div>
            {
                <button onClick={() => {
                    clear();
                    toggle()
                }}>
                    {
                        !editing ? 'Edit Profile' : 'Cancel'
                    }</button>
            }
            {!editing && JSON.stringify(user)}
            {editing && <EditProfile user={user}/>}
        </div>
    </>

}
export default Profile
const EditProfile = ({user}) => {
    const {put} = useAxios()
    const [form, onChange, clear, setFormState] = useForm({
        username: user.username,
        email: user.email,
        password: user.password
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = await put(`users/${user._id}`, '', form)
            setFormState(payload)
        } catch (e) {
            console.error(e)
        }
    }
    return <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" disabled name={'username'} value={form.username} onChange={onChange}/>
            <label htmlFor="email">Email</label>
            <input type="text" name={'email'} value={form.email} onChange={onChange}/>
            <label htmlFor="password">Password</label>
            <input type="text" name={'password'} value={form.password} onChange={onChange}/>
            <button type={'submit'}>Save</button>
        </form>
    </>
}