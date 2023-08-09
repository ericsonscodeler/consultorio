'use client'

import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Calendar } from '../../components/calendar'
import {
  CalendarHoursDay,
  ContainerCard,
  ContainerDoctor,
  DivDoctor,
  DivIcons,
} from './styles'
import { formateDate } from '../../utils/formatDate'

import { CalendarPlus, PencilSimple, Trash, PlusCircle } from 'phosphor-react'
import { getHoursEvery30min } from '@/app/utils/hourEvery30min'
import ModalDelete from '@/app/components/ModalDelete/'
import ModalEdit from '@/app/components/ModalEdit/'
import ModalTransferTime from '@/app/components/ModalTransferTime/'
import ModalScheduling from '@/app/components/ModalScheduling/'

import axios from '../../api/'
import { Doctor, Scheduling } from '../../utils/types'

interface ModalShedulingProps {
  data: {
    hour: string
    doctor: number
    date: string
  }
}

interface ModalEditProps {
  id: number
  date: string
  hour: string
}

const Agendamento = () => {
  const [dateSelect, dateSelected] = useState<Date>()
  const [hoursToScheduling, setHoursToScheduling] = useState<string[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [schedulings, setSchedulings] = useState<Scheduling[]>([])
  const [selectedDoctor, setSelectedDoctor] = useState<number>(1)

  const [schedulingForDelete, setSchedulingForDelete] = useState<number>()
  const [modalDelete, setModalDelete] = useState<boolean>(false)

  const [modalTransferTime, setModalTransferTime] = useState<boolean>(false)

  const [editData, setEditData] = useState<ModalEditProps>()
  const [modalEdit, setModalEdit] = useState<boolean>(false)

  const [modalScheduling, setModalScheduling] = useState<boolean>(false)
  const [dataScheduling, setDataScheduling] = useState<ModalShedulingProps>()
  useEffect(() => {
    setHoursToScheduling(getHoursEvery30min())
  }, [])

  useEffect(() => {
    axios
      .get<Doctor[]>('/doctors')
      .then((doctor: any) => setDoctors(doctor.data))
  }, [])

  useEffect(() => {
    if (dateSelect) {
      axios
        .get<Scheduling[]>(
          `/schedulings?_expand=user&_expand=doctor&doctorId=${selectedDoctor}&date=${formateDate(
            dateSelect,
          )}`,
        )
        .then((responseScheduling: any) => {
          setSchedulings(responseScheduling.data)
        })
    }
  }, [dateSelect, selectedDoctor])

  const schedules = hoursToScheduling.map((hour) => {
    const scheduling = schedulings.find(
      (scheduling) => scheduling.time === hour,
    )
    if (scheduling) {
      return scheduling
    } else {
      return {
        time: hour,
      }
    }
  })

  return (
    <Container className="d-flex">
      <div className="mt-3">
        <h4>Médicos</h4>
        <ContainerDoctor>
          {doctors.map((doctor: Doctor) => (
            <ContainerCard
              key={doctor.id}
              onClick={() => setSelectedDoctor(doctor.id)}
            >
              <img
                src={doctor.img}
                alt="Imagem Doutor"
                className="img-fluid rounded-circle"
                style={{ width: '50px', height: '50px' }}
              />
              <DivDoctor>
                <span>{doctor.name}</span>
                <span>{doctor.expertise}</span>
              </DivDoctor>
            </ContainerCard>
          ))}
        </ContainerDoctor>
        <Col style={{ width: '34rem' }}>
          <Calendar onDateSelected={dateSelected} />
        </Col>
      </div>
      <Container style={{ maxHeight: '850px', overflowY: 'auto' }}>
        <h3>{dateSelect ? formateDate(dateSelect) : '-'}</h3>
        {schedules.map((schedule, index) => (
          <div key={index}>
            <CalendarHoursDay>
              <div className="d-flex align-items">
                <div>
                  <span>{schedule.time}</span>
                </div>
                {schedule.userCPF ? (
                  <ContainerCard key={schedule} style={{ border: 'none' }}>
                    <img
                      src="user.png"
                      alt="Imagem Doutor"
                      className="img-fluid rounded-circle"
                      style={{ width: '50px', height: '50px' }}
                    />
                    <div className="d-flex flex-column">
                      <span>{schedule.userName}</span>
                      <span>{schedule.userCPF}</span>
                    </div>
                    <DivIcons>
                      <CalendarPlus
                        size={18}
                        onClick={() => setModalTransferTime(true)}
                      />
                      <PencilSimple
                        size={18}
                        onClick={() => {
                          setModalEdit(true)
                          setEditData({
                            id: schedule.id,
                            date: schedule.date,
                            hour: schedule.time,
                          })
                        }}
                      />
                      <Trash
                        size={18}
                        onClick={() => {
                          setModalDelete(true)
                          setSchedulingForDelete(schedule.id)
                        }}
                      />
                    </DivIcons>
                  </ContainerCard>
                ) : (
                  <ContainerCard
                    key={schedule.time}
                    style={{
                      display: 'flex',
                      justifyContent: 'end',
                      border: 'none',
                    }}
                  >
                    <PlusCircle
                      size={18}
                      onClick={() => {
                        setModalScheduling(true)
                        setDataScheduling({
                          data: {
                            doctor: selectedDoctor,
                            hour: schedule.time,
                            date: dateSelect ? formateDate(dateSelect) : '',
                          },
                        })
                      }}
                    />
                  </ContainerCard>
                )}
              </div>
            </CalendarHoursDay>
          </div>
        ))}
      </Container>
      {modalDelete && (
        <ModalDelete
          setVisible={setModalDelete}
          schedulingForDelete={schedulingForDelete}
        />
      )}
      {modalEdit && <ModalEdit setVisible={setModalEdit} dataEdit={editData} />}
      {modalTransferTime && (
        <ModalTransferTime setVisible={setModalTransferTime} />
      )}
      {modalScheduling && (
        <ModalScheduling
          setVisible={setModalScheduling}
          dataScheduling={dataScheduling ? dataScheduling.data : undefined}
        />
      )}
    </Container>
  )
}

export default Agendamento
