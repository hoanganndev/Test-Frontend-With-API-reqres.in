import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchUsersData } from "../../services/usersService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "./ModalAddUser";
import ModalEditUser from "./ModalEditUser";
import "./TableUsers.scss";
import _, { debounce } from "lodash";
import ModalConfirm from "./ModalConfirm";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
const TableUsers = () => {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});
    const [dataUserDelete, setDataUserDelete] = useState({});
    // Sort
    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    // Csv
    const [dataExport, setDataExport] = useState([]);
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
    // Sort
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let _listUsers = _.cloneDeep(listUsers);
        _listUsers = _.orderBy(_listUsers, [sortField], [sortBy]);
        setListUsers(_listUsers);
    };

    // Search
    const handleSearch = debounce(e => {
        console.log(">>> handle search");
        let value = e.target.value;
        if (value) {
            let _listUsers = _.cloneDeep(listUsers);
            _listUsers = _listUsers.filter(item => item.email.includes(value));
            setListUsers(_listUsers);
        } else {
            getUsers(1);
        }
    }, 500);

    // Export
    const getUserExport = (even, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["Id", "Email", "First name", "Last name"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    // Import
    const handleImportCSV = e => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            if (file.type !== "text/csv") {
                toast.warning("Only accept scv files...");
                return;
            }
            //Parse local CSV file
            Papa.parse(file, {
                //header: true, // convert csv file to array
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== "email" ||
                                rawCSV[0][1] !== "first_name" ||
                                rawCSV[0][2] !== "last_name"
                            ) {
                                toast.error("Wrong format Header CSV file...");
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let object = {};
                                        object.email = item[0];
                                        object.first_name = item[1];
                                        object.last_name = item[2];
                                        result.push(object);
                                    }
                                });
                                setListUsers(result);
                            }
                        } else {
                            toast.error("Wrong format CSV file...");
                        }
                    } else {
                        toast.error("Not found data in CSV file...");
                    }
                },
            });
        }
    };
    return (
        <>
            <div className="my-3 add-new-user">
                <span>
                    <h4>List Users</h4>
                </span>
                <div className="group-btns">
                    <label
                        htmlFor="import-file"
                        className="btn btn-outline-warning"
                    >
                        <i className="fa-solid fa-file-import"></i>Import
                    </label>
                    <input
                        id="import-file"
                        type="file"
                        hidden
                        onChange={e => handleImportCSV(e)}
                    />
                    <CSVLink
                        filename={"data-users.csv"}
                        className="btn btn-outline-info"
                        data={dataExport}
                        asyncOnClick={true}
                        onClick={getUserExport}
                    >
                        <i className="fa-solid fa-file-export"></i>
                        Export
                    </CSVLink>

                    <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleOpenModal()}
                    >
                        <i className="fa-solid fa-circle-plus "></i> Add new
                    </button>
                </div>
            </div>
            <div className="col-4 my-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by email ..."
                    onChange={e => handleSearch(e)}
                />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>
                            <div className="sort-header">
                                <span> ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort("desc", "id")}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort("asc", "id")}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className="sort-header">
                                <span>Email</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() =>
                                            handleSort("desc", "email")
                                        }
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() =>
                                            handleSort("asc", "email")
                                        }
                                    ></i>
                                </span>
                            </div>
                        </th>
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
