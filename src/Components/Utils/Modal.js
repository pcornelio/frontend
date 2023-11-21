import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ showModal, modalMessage, handleModalClose }) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mensaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;