import {useGlobalContext} from "../../state/contexts/GlobalContext";
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/ajax/useAxios";

const useJoinCourse = () => {
    const {username} = useGlobalContext()
    const navigate = useNavigate()
    const {post} = useAxios()
    const joinCourse =
        async (_id,flash) => {
            try {
                if (!username) throw new Error('No username')
                if (!_id) throw new Error('No course id')
                const response = await post(
                    `courses/${_id}/users/${username}`, {})
                console.log(`Joined course ${_id}`, response)
            } catch (e) {
                flash('Could Not Join Course:ol '+e.message)
                return console.error(e.message)
            }
            const url = `/courses/${_id}`

            navigate(url)
        }

    return joinCourse
}

export default useJoinCourse