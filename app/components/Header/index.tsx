'use client'

import Container from 'react-bootstrap/Container'
import { usePathname } from 'next/navigation'
import Navbar from 'react-bootstrap/Navbar'

export const Header = () => {
  const pathname = usePathname()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          {pathname === '/'
            ? 'DASHBOARD'
            : pathname.replace('/', '').toUpperCase()}
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
