import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../../services/UserServices';
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
    const { show, handleClose, dataUserEdit, handleEditUserFrommodal } = props;
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleUpdateUser = async () => {
        try {
            console.log("Updating user:", dataUserEdit.id, email, first_name, last_name, avatar);
            let res = await putUpdateUser(dataUserEdit.id, email, first_name, last_name, avatar);
            console.log("Update user response:", res);
            if (res) {
                console.log("User update successful. Data:", res);
                handleEditUserFrommodal({
                    id: dataUserEdit.id,
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    avatar: avatar
                });
                handleClose();
                toast.success("User updated successfully");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Failed to update user");
        }
    };
    useEffect(() => {
        if (show && dataUserEdit) {
            setEmail(dataUserEdit.email);
            setFirstName(dataUserEdit.first_name);
            setLastName(dataUserEdit.last_name);
            setAvatar(dataUserEdit.avatar);
        }
    }, [show, dataUserEdit]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" placeholder="First Name"
                                    value={first_name}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" placeholder="Last Name"
                                    value={last_name}
                                    onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Avatar</label>
                                <input type="text" className="form-control" placeholder="Avatar"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateUser}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;