import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import { getbyideUser, deleteUser, fetchAllUser } from '../../services/UserServices';
import ModalAddUser from './ModalAddUser';
import Button from 'react-bootstrap/Button';
import ModalEditUser from './ModalEditUser';
import _ from "lodash"
const TableUser = () => {

    const [listUsers, setListUser] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    const [isShow, setShow] = useState(false);
    const [isShowedit, setShowedit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const handleClose = () => { setShow(false); setShowedit(false) }
    const handleShow = () => setShow(true);


    const handleUpdateTable = (user) => {
        setListUser([user, ...listUsers]);
    }

    const handleEditUserFrommodal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        cloneListUser[index].last_name = user.last_name;
        cloneListUser[index].email = user.email;
        cloneListUser[index].avatar = user.avatar;
        setListUser(cloneListUser);
    }
    useEffect(() => {
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        try {
            let res = await fetchAllUser(page);
            if (res && res.length > 0) {
                setTotalUser(res.total);
                setListUser(res);
                setTotalPage(Math.ceil(res.total_page)); 
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.error("Error fetching users:", error); // Log any errors
        }
    }


    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    }
    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            getUsers(1);
        } catch (error) {
            console.error("Error delete user:", error);
            getUsers(1);
        }
    }
    const handleShowGetbyideUser = async (id) => {
        try {
            let res = await getbyideUser(id);
            if (res && res.id) {
                setDataUserEdit(res);
                setShowedit(true);
            } else {
                console.log("No data received");
            }
        } catch (error) {
            console.error("Error fetching users:", error); // Log any errors
        }
    }
    return (
        <>
            <div className="my-3 d-flex justify-content-between">
                <span>List User:</span>
                <button className='btn btn-success' onClick={handleShow}>Add new user</button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td><img style={{ width: 40 }} src={user.avatar} alt={user.first_name} /></td>
                                <td>
                                    <Button onClick={() => handleShowGetbyideUser(user.id)} variant="warning">Edit</Button>{' '}
                                    <Button onClick={() => handleDeleteUser(user.id)} variant="danger">Delete</Button>{' '}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPage}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName='page-item'
                nextLinkClassName="page-link"
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddUser show={isShow} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalAddUser show={isShow} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />
            <ModalEditUser show={isShowedit} handleClose={handleClose} dataUserEdit={dataUserEdit} handleEditUserFrommodal={handleEditUserFrommodal} />
        </>
    )
}

export default TableUser;