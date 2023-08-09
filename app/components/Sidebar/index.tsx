'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
// import { Container } from './styles'
import { LayoutDashboard, CalendarDays, CalendarCheck } from 'lucide-react'

const options = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    color: 'black',
    href: '/',
  },
  {
    label: 'Agendamento',
    icon: CalendarDays,
    color: 'black',
    href: '/agendamento',
  },
  {
    label: 'Consulta de Agendamentos',
    icon: CalendarCheck,
    color: 'black',
    href: '/consultas',
  },
]

export const Sidebar = () => {
  return (
    <Nav className="flex-column">
      <div>
        <img src="logo.png" alt="logo" />
      </div>
      {options.map((option) => (
        <Nav.Item key={option.href}>
          <Nav.Link
            key={option.label}
            className="px-3 py-3 d-flex align-items-center"
            href={option.href}
          >
            <option.icon color={option.color} />
            <span className="text-black ms-1 d-none d-sm-inline">
              {option.label}
            </span>
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  )
}
