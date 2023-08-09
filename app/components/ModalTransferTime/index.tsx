'use client'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
interface ModalDeleteProps {
  setVisible: (value: boolean) => void
}

const ModalDelete = ({ setVisible }: ModalDeleteProps) => {
  const handleClose = () => setVisible(false)
  const handleShow = () => setVisible(true)
  return (
    <Modal
      show={handleShow}
      onHide={handleClose}
      className="modal show"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ position: 'center' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Alterar horário de agendamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="cpf">
          <Form.Label>CPF</Form.Label>
          <Form.Control type="cpf" placeholder="CPF do paciênte" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Doctor">
          <Form.Label>Doutor</Form.Label>
          <Form.Control type="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="schedule">
          <Form.Label>Horário</Form.Label>
          <Form.Control type="" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Fechar</Button>
        <Button variant="primary" onClick={handleClose}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDelete
