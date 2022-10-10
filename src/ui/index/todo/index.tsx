import { TodoItem } from "@/types/todo-item"
import { motion } from "framer-motion"
import { MouseEventHandler } from "react"
import styled from "styled-components"
import Squircle from "./squircle"

type TodoProps = {
  dto: TodoItem
  onClick?: MouseEventHandler<HTMLDivElement>
}

export default function Todo({ dto, onClick }: TodoProps) {
  return (
    <Container onClick={onClick} className={dto.checked ? "checked" : ""}>
      <Checkbox />
      <Label>{dto.label}</Label>
    </Container>
  )
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #222;
  }

  &:active {
    background-color: #333;
  }

  &.checked {
    svg {
      opacity: 0.5;
      #fill {
        fill: white;
      }
    }
    p {
      color: gray;
      &:after {
        transform-origin: center left;
        transform: scaleX(1);
      }
    }
  }
`

const Checkbox = styled(Squircle)`
  fill: white;
  opacity: 0.85;
  max-width: 1.5rem;
  max-height: 1.5rem;
  #fill {
    fill: transparent;
  }
  transition: opacity 0.3s ease;
`

const Label = styled.p`
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  &:after {
    content: "";
    background: gray;
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    margin-top: -0.5em;
    transform: scaleX(0);
    transform-origin: center right;
    transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
`
