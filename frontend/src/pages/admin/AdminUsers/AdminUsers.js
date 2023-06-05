import useAxios from "../../../hooks/ajax/useAxios";
import React, {useEffect, useReducer, useState} from "react";
import usersReducer from "../../../state/redux/usersReducer";
import './AdminUsers.css'
import {INIT} from "../../../state/actions/actions";
import Modal, {useModal} from "../../../components/General/Modal/Modal";
import EditProfileForm from "../../user/UserProfile/EditUser/EditProfileForm";
import useForm from "../../../hooks/form/useForm";
import useFlash from "../../../hooks/form/useFlash";
import {useGlobalContext} from "../../../state/contexts/GlobalContext";

/**
 * AdminUsers component for administration of users. It displays a list of all users.
 */
const AdminUsers = () => {
    const {get} = useAxios()
    const [users, dispatchUsers] = useReducer(usersReducer, [])
    const [showing,
        {show, hide, toggle}
    ] = useModal()
    useEffect(() => {
        (async () => {

            try {
                const payload = await get('users')
                dispatchUsers({type: INIT, payload})
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    const [user, setUser] = useState(null)
    return (
        <>
            <AdminEditUserModal
                hide={() => {
                    setUser(null)
                    hide()
                }}
                visible={showing}

                user={user}
            />
            <h1>Admin Users</h1>

            {users.map((user) => (
                <div onClick={() => {
                    setUser(user)
                    show()
                }} key={user.username} className="AdminUser">

                    <div className="AdminUser_UserCard">

                        <div>
                        <div>{user.username} - {user.email}</div>
                        <div>id: {user._id}</div>
                        </div>
                    </div>

                </div>

            ))}
        </>
    )

}
const AdminEditUserModal = ({user, hide, visible}) => {
    const [msg, flash] = useFlash('text-danger')
    const{put} = useAxios()
    const [form, onChange, clear, setFormState] = useForm({
        email: '',
        password: '',
        old: ''
    })

   useEffect(() => {
    setFormState(user ? {email: user.email || null, password: user.password || null}:{})
       // alert(user.email)
   }  ,[user, setFormState])
const {username:admin}= useGlobalContext()
if(!user) return null
    return <Modal
        id={'AdminUserEditor'}
        zIndex={8}
        visible={visible}
        hide={hide}>
            <EditProfileForm
                editingUser={admin}
                form={form}
                flashState={[msg, flash]}
                username={user.username}
                cancel={hide}
                onChange={onChange}
                handleSubmit={async (e) => {
                    e.preventDefault()
                    try {
                        const payload = await put(`users/${user.username}`, '', form)
                        setFormState(payload)
                        clear()
                    } catch (e) {
                        flash(`Something went wrong updating ${user.username}: ${
                            e.response ? e.response.data.message : e.message
                        }`)
                        console.error(e)
                    }
                }
                }
            />
     </Modal>
}
export default AdminUsers