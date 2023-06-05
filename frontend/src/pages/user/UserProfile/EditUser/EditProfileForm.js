import LabeledInput from "../../../../components/General/LabeledInput/LabeledInput";
import Button from "../../../../components/General/Button/GenericButton/Button";

 const EditProfileForm = ({editingUser,flashState: [msg, flash], form, onChange, handleSubmit, username, cancel}) => <>
    <div className={'flash'}>{msg}</div>

    <div className="EditProfilePage">
        <form className={`EditProfileForm`} onSubmit={handleSubmit}>
            <LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Username'}
                name={'username'}
                value={username || ''}
                disabled
            />
            <LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Email'}
                name={'email'}
                value={form.email || ''}
                onChange={onChange}
                type={'email'}
            />
            {editingUser===username&&
                <><LabeledInput
                className={''}
                inputClass={''}
                labelClass={''}
                label={'Old Password'}
                name={'old'}
                value={form.old || ''}
                onChange={onChange}
                type={'password'}
            />
                <LabeledInput
                className={''}
            inputClass={''}
            labelClass={''}
            label={'Password'}
            name={'password'}
            value={form.password || ''}
            onChange={onChange}
            type={'password'}
        /></>
        }
            <div className="EditButtons">
                <Button className={'EditProfileButton Edit-Save'} type={'submit'}>Save</Button>
                <Button className={'EditProfileButton Edit-Cancel'} onClick={cancel}
                        type={'button'}>Cancel</Button>
            </div>
        </form>
    </div>
</>
export default EditProfileForm