import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface IModalProps {
  title: string;
  message: string;
  showModal: boolean;
}

const CustomModal: React.FC<IModalProps> = ({ title, message, showModal }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
