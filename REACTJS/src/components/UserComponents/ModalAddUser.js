import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../services/UserServices';
import { toast } from 'react-toastify';

const ModalAddUser = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [email, setEmail] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [avatar, setavatar] = useState('');
    const [password, setpassword] = useState('');
    const handleSave = async () => {
        let res = await postCreateUser(email, first_name, last_name, avatar, password);
        if (res && res.id) {
            handleClose();
            setEmail("");
            setfirst_name("");
            setlast_name("");
            setavatar("");
            setpassword("");
            toast.success("Create user successfully");
            handleUpdateTable({
                id: res.id,
                email: res.email,
                first_name: res.first_name,
                last_name: res.last_name,
                avatar: res.avatar,
                password: res.password
            });
        } else {
            toast.error("Create user failed");
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div>
                            <form>
                                <div class="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" class="form-control" placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label className="form-label">First_name</label>
                                    <input type="text" class="form-control" placeholder="First_name"
                                        value={first_name}
                                        onChange={(e) => setfirst_name(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label className="form-label">Last_name</label>
                                    <input type="text" class="form-control" placeholder="Last_name"
                                        value={last_name}
                                        onChange={(e) => setlast_name(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label className="form-label">Avatar</label>
                                    <input type="text" class="form-control" placeholder="Avatar"
                                        value={avatar}
                                        onChange={(e) => setavatar(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label className="form-label">Password</label>
                                    <input type="password" class="form-control" placeholder="Avatar"
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)} />
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddUser;