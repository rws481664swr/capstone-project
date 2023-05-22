import '../DisplayProfile.css'

const UserProfileContent = ({user}) => {
    return <div className="UserCard UserCard_Text">

        Name: {user.first_name} {user.last_name}
        <div>Username: {user.username}</div>
        <div>Email: {user.email}</div>

    </div>
}
export default UserProfileContent