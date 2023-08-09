'use client'

import React from 'react'
import { Container, Title } from './styles'

interface CardProps {
  title: string
  value: string
  Icon: React.ElementType
}

const Card = ({ Icon, title, value }: CardProps) => {
  return (
    <Container>
      <div>
        <Icon size={45} />
        <p>{value}</p>
      </div>
      <Title>
        <p>{title}</p>
      </Title>
    </Container>
  )
}

export default Card
