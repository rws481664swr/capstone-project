import './ConfirmationModal.css'
import Modal from "../General/Modal/Modal";
import Button from "../General/Button/GenericButton/Button";

const ConfirmationModal = ({visible=false, hide, onConfirm, onCancel=hide, title='', message=''}) => {

    return (
        <Modal visible={visible} hide={hide} className={``} zIndex={7}>
            <div className="ConfirmationModal">
                <div className="ConfirmationModal_Content">
                    <div className="ConfirmationModal_Title">
                        {title}
                    </div>
                    <div className="ConfirmationModal_MessageText">
                        {message}
                    </div>
                    <div className="ConfirmationModal_Buttons">
                        <div className="ConfirmationModal_CenteredContainer">
                        <Button className={'ConfirmationModal_ConfirmButton'} onClick={onConfirm}>Confirm</Button>
                        <Button className={'ConfirmationModal_CancelButton'} onClick={onCancel}>Cancel</Button>
                    </div>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default ConfirmationModal