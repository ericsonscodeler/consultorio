export type Doctor = {
  id: number
  name: string
  expertise: string
  img: string
}

export type User = {
  id: number
  name: string
  cpf: string
  data: string
  address: string
}

export type Scheduling = {
  id: number
  date: string
  time: string
  value: string
  user_id: number
  userName: string
  doctor_id: number
  doctor: Doctor
}
