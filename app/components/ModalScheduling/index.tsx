import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useForm, SubmitHandler } from 'react-hook-form'
import api from '../../api/'

interface ModalSchedulingProps {
  setVisible: (value: boolean) => void
  dataScheduling: {
    hour: string
    doctor: number
    date: string
  }
}

type Inputs = {
  name: string
  cpf: number
  value: string
}

const ModalScheduling = ({
  setVisible,
  dataScheduling,
}: ModalSchedulingProps) => {
  const handleClose = () => setVisible(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      await api.post('/schedulings', {
        date: dataScheduling?.date,
        time: dataScheduling.hour,
        doctorId: dataScheduling.doctor,
        value: data.value,
        userName: data.name,
        userCPF: data.cpf,
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
        <Modal.Title>Agendar horário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="name"
              placeholder="Nome do paciente"
              autoFocus
              {...register('name', { required: 'Nome é obrigatório' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="number"
              placeholder="CPF do paciente"
              {...register('cpf', { required: 'CPF é obrigatório' })}
            />
            {errors.cpf && <span>{errors.cpf.message}</span>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="value">
            <Form.Label>Valor da consulta</Form.Label>
            <Form.Control
              type="valor"
              placeholder="Valor da consulta"
              {...register('value', { required: 'Valor é obrigatório' })}
            />
            {errors.value && <span>{errors.value.message}</span>}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" type="submit">
              Confirmar agendamento
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalScheduling
