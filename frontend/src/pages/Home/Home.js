import CourseList from "../CourseList";
import './Home.css'
import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {Link} from "react-router-dom";

const Home = () => {

const {loggedIn}=useGlobalContext()

    return (
        <div id={"HomePage"} className={'sr-container' }>
            <h1>Home</h1>
            <div className={'Home_Welcome'}>
                <p>Welcome to the home page</p>
                <p>
                    {!loggedIn &&
                        <p>
                        <Link to={'/login'}>
                            Click Here to log in
                        </Link>
                        </p>
                    }
                    {!loggedIn &&
                        <Link to={'/register'}>
                            Click Here to sign up
                        </Link>
                    }

            </p>
            </div>

            {loggedIn && <div id={'Home_Content'} className={'Home_content'}>
                <div id="Home_CourseList">
                    <CourseList displayFAB={false} scroll={true}/>
                </div>
            </div>}
        </div>
    )
}


export default Home