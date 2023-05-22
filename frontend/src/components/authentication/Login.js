import useForm from "../../hooks/useForm";
import axios from "axios";
import {BASE_URL} from "../../config";
import './Login.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import useFlash from "../../hooks/useFlash";
import Button from "../General/Button/Button";

/**
 * Login component for user authentication.
 */
const Login=()=>{
    const [toRender, flash, , {danger}]= useFlash()
        const navigate = useNavigate()
    const{setToken}=useGlobalContext()
    const [form, onChange] = useForm({
        username: "",
        password: ''
    })
    const submit = async (e)=>{
        e.preventDefault()
        try{
            const {data: {token}} = await axios.post(`${BASE_URL}/auth/login`, form)
            setToken(token)
            navigate('/')
        }catch (e) {
            console.error(e)
            danger()
            flash(`Something went wrong logging in: ${
                e.response ? e.response.data.message : e.message
            }`)
        }
    }
    return <form onSubmit={submit} className={'login Login_form'}>
        <div>{toRender}</div>
        <h4>Log In</h4>
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
            <Button
                className="Login_button  register"
                type="submit">Log In
            </Button>
        </div>
    </form>
}

export default Login