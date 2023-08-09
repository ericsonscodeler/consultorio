'use client'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from '../../api'

interface ModalDeleteProps {
  setVisible: (value: boolean) => void
  schedulingForDelete: number
}

const ModalDelete = ({ setVisible, schedulingForDelete }: ModalDeleteProps) => {
  const handleClose = () => setVisible(false)
  const handleShow = () => setVisible(true)

  const handleDelete = async () => {
    try {
      await axios.delete(`/schedulings/${schedulingForDelete}`)
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
      window.location.reload()
    }
  }
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
        <Modal.Title>Excluir Agendamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Você tem certeza que deseja excluir esse agendamento ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Fechar</Button>
        <Button variant="primary" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalDelete
