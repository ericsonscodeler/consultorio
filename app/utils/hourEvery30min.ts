export const getHoursEvery30min = () => {
  const horaInicio = new Date()
  horaInicio.setHours(8, 0, 0, 0)

  const horaFim = new Date()
  horaFim.setHours(17, 0, 0, 0)

  const intervalo = 30 * 60 * 1000

  const horariosGerados = []
  let horaAtual = horaInicio

  while (horaAtual <= horaFim) {
    const horaFormatada = horaAtual.getHours().toString().padStart(2, '0')
    const minutoFormatado = horaAtual.getMinutes().toString().padStart(2, '0')
    const horarioFormatado = `${horaFormatada}:${minutoFormatado}`

    horariosGerados.push(horarioFormatado)

    horaAtual = new Date(horaAtual.getTime() + intervalo)
  }

  return horariosGerados
}
