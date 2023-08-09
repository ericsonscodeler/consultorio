import styled from 'styled-components'

export const ContainerDoctor = styled.div`
  display: flex;
  max-height: 20rem;
  width: 32rem;
  overflow-y: auto;
  flex-direction: column;
`

export const ContainerCard = styled.div`
  margin: 10px 0 10px 0;
  display: flex;
  height: 5rem;
  width: 20rem;
  padding: 1em;
  border: 1px solid black;
  border-radius: 8px;
  background-color: #fbfbfb;
  div {
    margin-left: 10px;
  }
`

export const DivDoctor = styled.div`
  display: flex;
  flex-direction: column;
`

export const CalendarHoursDay = styled.div`
  display: flex;
  margin-top: 10px;
  div {
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    padding: 0.7rem;
    background: #fbfbfb;
  }
`

export const DivIcons = styled.div`
  display: flex;
  justify-content: end;

  svg {
    margin-left: 20px;
  }
`
