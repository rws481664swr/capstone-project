import useForm from "../../hooks/useForm";
import './Register.css'
import axios from 'axios'
import {BASE_URL} from '../../config.js'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const {setToken} = useGlobalContext()
    const navigate=useNavigate()
    const [form, onChange] = useForm({
        username: "",
        password: '',
        email: "",
        first_name: "",
        last_name: ""
    })
    const submit = async (e) => {
        e.preventDefault()
        try{
            const {data: {token}} = await axios.post(`${BASE_URL}/auth/register`, form)

            setToken(token)
            navigate('/')
        }catch ({response:{data}}) {
            console.error(data.message)
            alert(`Error: ${data.message}`)
        }
    }
    return <form onSubmit={submit} className={'register'}>
        <div className={'register'}>
            <label className={'register'} htmlFor={'username'}>Username</label>
            <input name={'username'}
                   value={form.username}
                   onChange={onChange}
                   className={'register'}
                   id={'username'}
                   type={'text'}/>
        </div>
        <div className={'register'}>
            <label className={'register'} htmlFor={'password'}>Password</label>
            <input name={'password'}
                   value={form.password}
                   onChange={onChange}
                   className={'register'}
                   id={'password'}
                   type={'password'}/>
        </div>


        <div className={'register'}>
            <label className={'register'} htmlFor={'email'}>Email</label>
            <input name={'email'}
                   value={form.email}
                   onChange={onChange}
                   className={'register'}
                   id={'email'}
                   type={'email'}/>

        </div>
        <div className={'register'}>
            <label className={'register'} htmlFor={'first_name'}>First Name</label>
            <input name={'first_name'}
                   value={form.first_name}
                   onChange={onChange}
                   className={'register'}
                   id={'first_name'}
                   type={'text'}/>

        </div>
        <div className={'register'}>
            <label className={'register'} htmlFor={'last_name'}>Last Name</label>
            <input name={'last_name'}
                   value={form.last_name}
                   onChange={onChange}
                   className={'register'}
                   id={'last_name'}
                   type={'text'
                   }/>

        </div>
        <button
            className="btn btn-primary register"
            type="submit">Register
        </button>
    </form>

}

export default Register