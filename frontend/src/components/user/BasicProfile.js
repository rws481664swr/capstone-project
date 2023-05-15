import useProfile from "./useProfile";

const BasicProfile = ({username}) => {
    const user = useProfile(username)
    // const navigate  = useNavigate()

    if (!user) return null

    return <>
        <div>
            {JSON.stringify(user)}
        </div>
    </>
}
export default BasicProfile