import StorageService from "@/libs/storage"
import { TodoItem } from "@/types/todo-item"
import { useRef, useState } from "react"
import styled from "styled-components"

export default function Todo({
  dto,
  handleToggle,
}: {
  dto: TodoItem
  handleToggle: Function
}) {
  const [checked, setChecked] = useState(dto.checked)

  return (
    <Container onClick={() => handleToggle()}>
      <Checkbox className={checked ? "checked" : ""} />
      <Label>{dto.label}</Label>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
`

const Label = styled.p``

const Checkbox = styled.div`
  background: red;
  width: 1.5rem;
  height: 1.5rem;

  &.checked {
    background: blue;
  }
`
