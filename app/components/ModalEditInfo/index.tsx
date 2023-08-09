import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'

import axios from '../../api'

type Inputs = {
  doctor: string
  name: string
  type: string
  value: string
  date: string
  time: string
}

interface TableAppointmentProps {
  setVisible: (value: boolean) => void
  dataEdit?: {
    id: number
    name: string
    doctor: string
    type: string
    value: string
    dateTime: {
      date: string
      time: string
    }
  }
}

const ModalEditInfo = ({ setVisible, dataEdit }: TableAppointmentProps) => {
  const handleClose = () => setVisible(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: dataEdit?.name,
      doctor: dataEdit?.doctor,
      type: dataEdit?.type,
      value: dataEdit?.value,
      date: dataEdit?.dateTime?.date,
      time: dataEdit?.dateTime?.time,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await axios.patch(`/schedulings/${dataEdit?.id}`, {
        name: data?.name,
        doctor: data?.doctor,
        type: data?.type,
        value: data?.value,
        date: data?.date,
        time: data?.time,
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
        <Modal.Title>Alterar informações</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="doctor">
            <Form.Label>Doutor</Form.Label>
            <Form.Control
              type="text"
              {...register('doctor', { required: 'Doutor é obrigatório' })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Especialidade</Form.Label>
            <Form.Control
              type="text"
              {...register('type', { required: 'Especialidade é obrigatório' })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="value">
            <Form.Label>Valor da consulta</Form.Label>
            <Form.Control
              type="text"
              {...register('value', {
                required: 'Valor da consulta é obrigatório',
              })}
            />
            {errors.date && <span>{errors.date.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Dia</Form.Label>
            <Form.Control
              type="text"
              {...register('date', { required: 'Dia é obrigatório' })}
            />
            {errors.hour && <span>{errors.hour.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="time">
            <Form.Label>Horário</Form.Label>
            <Form.Control
              type="text"
              {...register('time', { required: 'Horário é obrigatório' })}
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

export default ModalEditInfo
