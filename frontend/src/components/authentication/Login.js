import useForm from "../../hooks/useForm";
import axios from "axios";
import {BASE_URL} from "../../config";
import './Login.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
const Login=()=>{
        const navigate = useNavigate()
const{setToken}=useGlobalContext()
    const [form, onChange] = useForm({
        username: "",
        password: ''
    })
    const submit = async (e)=>{
        e.preventDefault()
        const {data:{token}} = await axios.post(`${BASE_URL}/auth/login`,form)
        setToken(token)
        navigate('/')
    }
    return <form onSubmit={submit} className={'login'}>
        Log In
        <div className={'login'}>
            <label className={'login'} htmlFor={'username'}>Username</label>
            <input name={'username'}
                   value={form.username}
                   onChange={onChange}
                   className={'login'}
                   id={'username'}
                   type={'text'}/>
        </div>
        <div className={'login'}>
            <label className={'login'} htmlFor={'password'}>Password</label>
            <input name={'password'}
                   value={form.password}
                   onChange={onChange}
                   className={'login'}
                   id={'password'}
                   type={'password'}/>
            <button
                className="btn btn-primary register"
                type="submit">Log In
            </button>
        </div>
    </form>
}

export default Login