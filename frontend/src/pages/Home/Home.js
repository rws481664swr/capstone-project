import CourseList from "../CourseList";
import {useEffect, useState} from "react";
import './Home.css'
import Timestamp from "../../components/General/Timestamp";
import './Home_ResponsiveBorder.css'
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
                <Link to={'/login'}>Click Here to log in</Link>
                </p>

                  <p> <Link to={'/register'}>Click Here to sign up</Link></p>
            </div>
            {loggedIn && <div id={'Home_Content'} className={'Home_content'}>
                <div id="Home_CourseList">
                    <CourseList scroll={true}/>
                </div>
            </div>}
        </div>
    )
}

const MyPosts = ({username, get}) => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await get(`posts/users/${username}`)
                setPosts(response)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [setPosts, username, get])


    return (
        <div>
            <h2>My Posts</h2>
            {posts && posts.map((post) =>
                <div className={'MyPost'} key={post._id}>
                    <div className={'MyPostTitle'}>{post.title}</div>
                    <div className={'MyPostContent'}>
                        {post.content}
                        <Timestamp className={'MyPostTimestamp'} date={post.postDate}/>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default Home