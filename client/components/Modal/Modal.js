import React from 'react'
import { Modal,Button } from 'react-bootstrap';

export default function CustomModal( {show,hideHandler,message, title} ) {
  return (
  <Modal  className="text-black" show={ show } onHide={ hideHandler }>
    <Modal.Header closeButton>
        <Modal.Title className={ [show ? 'text-success' : 'text-danger', 'text-capitalicze'].join(' ') } >{ title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant={show ? 'success' : 'danger'} onClick={ hideHandler }>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
