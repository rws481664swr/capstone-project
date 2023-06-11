import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/ajax/useAxios";

const useJoinCourse = () => {
    const {username} = useGlobalContext()
    const navigate = useNavigate()
    const {post} = useAxios()
    const joinCourse =
        async (_id, flash) => {
            try {
                if (!username) throw new Error('No username')
                if (!_id) throw new Error('No course id')
               await post(
                    `courses/${_id}/users/${username}`, {})
            } catch (e) {
                console.error(e.response.data.message)
                flash('Could Not Join Course:  ' + e.response.data.message)
                return console.error(e.response.data.message)
            }
            const url = `/courses/${_id}`

            navigate(url)
        }

    return joinCourse
}

export default useJoinCourse