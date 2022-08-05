import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../../services/usersService";
import { toast } from "react-toastify";

const ModalEditUser = props => {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        if (show) {
            let { first_name } = dataUserEdit;
            setName(first_name);
        }
    }, [dataUserEdit]);

    const handleEditUser = async () => {
        let res = await updateUser(name, job);
        if (res && res.updatedAt) {
            let user = {
                id: dataUserEdit.id,
                first_name: name,
            };
            handleEditUserFromModal(user);
            handleClose();
            toast.success("Edit user success !");
        }
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <form>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputName"
                                    className="form-label"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputName"
                                    aria-describedby="emailHelp"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputJob"
                                    className="form-label"
                                >
                                    Job
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputJob"
                                    value={job}
                                    onChange={e => setJob(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalEditUser;
