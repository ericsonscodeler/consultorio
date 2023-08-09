import { styled } from 'styled-components'

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CalendarTitle = styled.p`
  font-weight: 400;
  text-transform: capitalize;

  span: {
    color: gray;
  }
`

export const CalendarActions = styled.div`
  display: flex;
  gap: 1rem;
  color: gray;

  button {
    all: unset;
    cursor: pointer;
    line-height: 0;
    border-radius: 0.25rem;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover {
      color: gray;
    }

    &:focus {
      box-shadow: 0 0 0 2px gray;
    }
  }
`

export const CalendarBody = styled.table`
  width: 400px;
  font-family: default;
  border-spacing: 1rem;
  table-layout: fixed;

  thead th {
    color: gray;
    font-weight: medium;
    font-size: 1rem;
  }

  tbody:before {
    content: '.';
    line-height: 0.75rem;
    display: block;
    color: white;
  }

  tbody td {
    box-sizing: border-box;
  }
`

export const CalendarDay = styled.button`
  all: unset;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #cde0f0;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;

  &:disabled {
    background: none;
    cursor: default;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    background: #b3d4f1;
  }

  &:focus {
    box-shadow: 0 0 0 2px #b3d4f1;
  }
`
