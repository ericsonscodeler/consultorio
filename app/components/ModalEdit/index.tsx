import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'

import axios from '../../api'

type Inputs = {
  date: string
  hour: string
}

interface ModalEditProps {
  setVisible: (value: boolean) => void
  dataEdit: {
    id: number
    date: string
    hour: string
  }
}

const ModalEdit = ({ setVisible, dataEdit }: ModalEditProps) => {
  const handleClose = () => setVisible(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      date: dataEdit.date,
      hour: dataEdit.hour,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await axios.patch(`/schedulings/${dataEdit.id}`, {
        date: data.date,
        time: data.hour,
      })
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
      window.location.reload()
    }
  }

  return (
    <Modal
      show={true}
      onHide={handleClose}
      className="modal show"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ position: 'center' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Alterar agendamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Data</Form.Label>
            <Form.Control
              type="text"
              {...register('date', { required: 'Data é obrigatória' })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="hour">
            <Form.Label>Horário</Form.Label>
            <Form.Control
              type="text"
              {...register('hour', { required: 'Horário é obrigatório' })}
            />
            {errors.hour && <span>{errors.hour.message}</span>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Alterar
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalEdit
