import { TodoItem } from "@/types/todo-item"
import { MouseEventHandler, useState } from "react"
import styled from "styled-components"

type TodoProps = {
  dto: TodoItem
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Todo({ dto, onClick }: TodoProps) {
  return (
    <Container onClick={onClick}>
      <Checkbox className={dto.checked ? "checked" : ""} />
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
