'use client'
import { Col, Row } from 'react-bootstrap'
import { ContainerCard, Container } from './styles'
import {
  Calendar as CalendarIcon,
  CalendarCheck,
  CurrencyDollar,
} from 'phosphor-react'
import { TableReminder } from '@/app/components/Table/index'
import { Calendar } from '../components/Calendar'
import { useEffect, useState } from 'react'
import { formateDate } from '@/app/utils/formatDate'

import axios from '../api'

interface DateProps {
  date: string
  patientsTreated: number
  revenue: string
  schedules: number
  reminder: {
    time: string
    doctor: string
    type: string
    value: string
  }[]
}

const Dashboard = () => {
  const [date, setDate] = useState<Date>()
  const [dataToShow, setDataToShow] = useState<DateProps>()

  useEffect(() => {
    if (date) {
      axios
        .get<DateProps[]>(`/infodate?date=${formateDate(date)}`)
        .then((responseInfo: any) => {
          setDataToShow(responseInfo.data[0])
        })
    }
  }, [date])

  return (
    <>
      <Container>
        <Row>
          <div className="mt-3">
            <div className="">
              <div className="card mb-3 " style={{ width: '20rem' }}>
                <div className="card-header">Paciêntes atendidos</div>
                <ContainerCard>
                  <CalendarCheck size={40} />
                  <p className="card-text">
                    {dataToShow?.patientsTreated
                      ? dataToShow.patientsTreated
                      : '-'}
                  </p>
                </ContainerCard>
              </div>
              <div className="card bg-light mb-3" style={{ width: '20rem' }}>
                <div className="card-header">Receita</div>
                <ContainerCard className="bg-light">
                  <CurrencyDollar size={40} />
                  <p className="card-text">
                    {dataToShow?.revenue ? dataToShow.revenue : '-'}
                  </p>
                </ContainerCard>
              </div>
              <div className="card bg-light mb-3 " style={{ width: '20rem' }}>
                <div className="card-header">Agendamentos</div>
                <ContainerCard>
                  <CalendarIcon size={40} />
                  <p className="card-text">
                    {dataToShow?.schedules ? dataToShow.schedules : '-'}
                  </p>
                </ContainerCard>
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <Calendar selectedDate={date} onDateSelected={setDate} />
        </Row>
      </Container>
      <Container>
        <Col>
          <>Avisos/Lembretes</>
          <TableReminder reminders={dataToShow?.reminder} />
        </Col>
      </Container>
    </>
  )
}

export default Dashboard
