'use client'

import Table from 'react-bootstrap/Table'

import { Warning } from '../Warning'
interface TableReminderProps {
  time: string
  doctor: string
  type: string
  value: string
}
interface Props {
  reminders?: TableReminderProps[]
}
export const TableReminder: React.FC<Props> = ({ reminders }) => {
  return (
    <div className="table-responsive" style={{ maxHeight: '20rem' }}>
      <Table striped="columns">
        <thead>
          <tr>
            <th>Horario</th>
            <th>Médico</th>
            <th>Tipo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {reminders?.map((reminder, index) => (
            <tr key={index}>
              <td>{reminder.time}</td>
              <td>{reminder.doctor}</td>
              <td>{reminder.type}</td>
              <td>{reminder.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
