import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteUser } from "../../services/usersService";

const ModalConfirm = props => {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
        props;

    const style = {
        color: "#ff0f3c",
    };

    const confirmDelete = async () => {
        let { id, email } = dataUserDelete;
        let res = await deleteUser(id);
        if (res && res.status === 204) {
            toast.success("Delete user success !");
            handleDeleteUserFromModal(dataUserDelete);
            handleClose();
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
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h6>This action can't be undone!</h6>
                        <div>
                            Do you wan't delete this user:{" "}
                            <b style={style}>
                                {dataUserDelete
                                    ? dataUserDelete.email
                                    : "Anonymous"}{" "}
                                !
                            </b>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirm;
