export const formateDate = (data: Date) => {
  const originalDate = new Date(data)
  const day = originalDate.getDate().toString().padStart(2, '0')
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0')
  const year = originalDate.getFullYear()

  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}
