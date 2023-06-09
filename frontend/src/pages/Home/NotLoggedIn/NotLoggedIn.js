import {Link} from "react-router-dom";
import './NotLoggedIn.css'
const NotLoggedIn = () =>
    <>
        <div className={'Home_Welcome'}>
            <h3>Welcome to the home page</h3>


            <p>
                <Link to={'/login'}>
                    Click Here to log in
                </Link>
            </p>
            <p>

                <Link to={'/register'}>
                    Click Here to sign up
                </Link>
            </p>


        </div>
    </>

export default NotLoggedIn