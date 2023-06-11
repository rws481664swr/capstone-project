import useForm from "../../hooks/form/useForm";
import axios from "axios";
import {BASE_URL} from "../../config";
import './Login.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import useFlash from "../../hooks/form/useFlash";
import Button from "../../components/General/Button/GenericButton/Button";

/**
 * Login component for user authentication.
 */
const Login = () => {
    const [toRender, , , {danger}] = useFlash()
    const navigate = useNavigate()
    const {setToken} = useGlobalContext()
    const [form, onChange] = useForm({
        username: "",
        password: ''
    })

    const submit = async (e) => {
        e.preventDefault()
        try {

            const promise = axios.post(`${BASE_URL}/auth/login`, form)
            const {data: {token}} = await promise
            setToken(token)
            navigate('/')
        } catch (e20) {
            console.error(e20)
            if (e20.message) danger(e20.message)
            else if (e20.response && e20.response.data) danger(`Something went wrong logging in: ${
                e20.response ? e20.response.data.message : e20.message
            }`)


        }
    }
    return (
        <div id={'Login'} className="login">
            <form onSubmit={() => alert('onsubmit')} className={'login Login_form'}>

                <div className="login-items">
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
                            onClick={submit}
                            className="Login_button  register"
                            type="submit">Log In
                        </Button>
                    </div>
                </div>
            </form>
        </div>)
}

export default Login