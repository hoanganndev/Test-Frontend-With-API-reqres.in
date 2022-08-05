import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchUsersData } from "../../services/usersService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import "./TableUsers.scss";
import _ from "lodash";
import ModalConfirm from "./ModalConfirm";
const TableUsers = () => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});

    useEffect(() => {
        getUsers(1);
    }, []);

    // Modal add new user
    const handleCloseModal = action => {
        setIsShowModalUser(false);
    };

    const handleOpenModal = () => {
        setIsShowModalUser(true);
    };

    const getUsers = async page => {
        let res = await fetchUsersData(page);
        if (res && res.data) {
            const { data, total, total_pages } = res;
            setListUsers(data);
            setTotalUsers(total);
            setTotalPages(total_pages);
        }
    };

    // ReactPaginate
    const handlePageClick = e => {
        const currentPage = +e.selected + 1;
        getUsers(currentPage);
    };

    const handleUpdateTableUsers = user => {
        setListUsers([user, ...listUsers]);
    };

    // Edit user
    const handleEditUser = user => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setIsShowModalEdit(false);
    };

    const handleEditUserFromModal = user => {
        let _listUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        _listUsers[index].first_name = user.first_name;
        setListUsers(_listUsers);
    };

    // Delete user
    const handleCloseModalDelete = () => {
        setIsShowModalDelete(false);
    };

    const handleDeleteUser = user => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    const handleDeleteUserFromModal = user => {
        let _listUsers = _.cloneDeep(listUsers);
        _listUsers = _listUsers.filter(item => item.id !== user.id);
        setListUsers(_listUsers);
    };

    return (
        <>
            <div className="my-3 add-new-user">
                <span>
                    <h4>List Users</h4>
                </span>
                <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => handleOpenModal()}
                >
                    Add new user
                </button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>email</th>
                        <th>first_name</th>
                        <th>last_name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.map((user, index) => {
                            return (
                                <tr key={`user-${user.id}`}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-warning mx-3"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-outline-danger "
                                            onClick={() =>
                                                handleDeleteUser(user)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                //React paginate css
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddUser
                show={isShowModalUser}
                handleClose={handleCloseModal}
                handleUpdateTableUsers={handleUpdateTableUsers}
            />
            <ModalEditUser
                show={isShowModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleCloseModalEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleCloseModalDelete}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
};

export default TableUsers;
