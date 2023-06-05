import useForm from "../../hooks/form/useForm";
import './Register.css'
import axios from 'axios'
import {BASE_URL} from '../../config.js'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import Button from "../../components/General/Button/GenericButton/Button";
import LabeledInput from "../../components/General/LabeledInput/LabeledInput";

const Register = () => {
    const {setToken, token: tokenRef} = useGlobalContext()
    const navigate = useNavigate()
    const [form, onChange] = useForm({
        username: "",
        password: '',
        email: "",
        first_name: "",
        last_name: ""
    })
    const submit = async (e) => {
        e.preventDefault()
        try {
            const {data: {token}} = await axios.post(`${BASE_URL}/auth/register`, form)
            tokenRef.current = token
            setToken(token)
            navigate('/')
        } catch ({response: {data}}) {
            console.error(data.message)
            alert(`Error: ${data.message}`)
        }
    }
    return <form onSubmit={submit} className={'sr-container register'}>
        <LabeledInput
            className={'register'}
            label={'First Name'}
            name={'first_name'}
            value={form.first_name}
            onChange={onChange}
            type={'text'}

        />
        <LabeledInput
            className={'register'}
            label={'Last Name'}
            name={'last_name'}
            value={form.last_name}
            onChange={onChange}
            type={'text'}
            />
        <LabeledInput
            className={'register'}
            label={'Email'}
            name={'email'}
            value={form.email}
            onChange={onChange}
            type={'email'}
            />
        <LabeledInput
            className={'register'}
            label={'Username'}
            name={'username'}
            value={form.username}
            onChange={onChange}
            type={'text'}
            />
        <LabeledInput
            className={'register'}
            label={'Password'}

            name={'password'}
            value={form.password}
            onChange={onChange}
            type={'password'}
            />
        <Button
            className="  register"
            type="submit">
            Register
        </Button>
    </form>

}

export default Register