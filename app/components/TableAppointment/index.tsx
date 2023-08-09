'use client'

import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { DivFormCheckBox, DivIcons } from './styles'
import { PencilSimple, MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'
import axios from '../../api/'
import { Scheduling } from '../../utils/types'
import ModalEditInfo from '../ModalEditInfo/index'

interface TableAppointmentProps {
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

export const TableAppointment: React.FC = () => {
  const [schedulings, setSchedulings] = useState<Scheduling[]>([])

  const [dataInfoEdit, setDataInfoEdit] = useState<TableAppointmentProps>()
  const [modalEditInfo, setModalEditInfo] = useState<boolean>(false)

  useEffect(() => {
    axios
      .get<Scheduling[]>('/schedulings?_expand=user&_expand=doctor')
      .then((responseScheduling: any) => {
        setSchedulings(responseScheduling.data)
      })
  }, [])

  return (
    <div className="table-responsive">
      <Table striped="columns">
        <thead>
          <tr>
            <th style={{ width: '5rem' }} />
            <th style={{ width: '50rem' }}>Paciênte</th>
            <th style={{ width: '10rem' }}>Doutor</th>
            <th style={{ width: '10rem' }}>Tipo</th>
            <th style={{ width: '10rem' }}>Valor</th>
            <th style={{ width: '15rem' }}>Data/Hora</th>
            <th style={{ width: '10rem' }} />
          </tr>
        </thead>
        <tbody>
          {schedulings.map((scheduling) => (
            <tr key={scheduling.id}>
              <td>
                <DivFormCheckBox className="d-flex align-center">
                  <Form>
                    <div className="mb-3">
                      <Form.Check type="checkbox" />
                    </div>
                  </Form>
                </DivFormCheckBox>
              </td>
              <td>{scheduling.userName}</td>
              <td>{scheduling.doctor.name}</td>
              <td>{scheduling.doctor.expertise}</td>
              <td>{scheduling.value}</td>
              <td>{`${scheduling.date} - ${scheduling.time}`}</td>
              <td>
                <DivIcons>
                  <PencilSimple
                    size={20}
                    onClick={() => {
                      setModalEditInfo(true)
                      setDataInfoEdit({
                        id: scheduling.id,
                        doctor: scheduling.doctor.expertise,
                        name: scheduling.userName,
                        type: scheduling.doctor.expertise,
                        value: scheduling.value,
                        dateTime: {
                          date: scheduling.date,
                          time: scheduling.time,
                        },
                      })
                    }}
                  />
                  <MagnifyingGlass size={20} />
                </DivIcons>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {modalEditInfo && (
        <ModalEditInfo
          setVisible={setModalEditInfo}
          dataEdit={dataInfoEdit || undefined}
        />
      )}
    </div>
  )
}
