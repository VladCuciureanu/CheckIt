import { TodoItem } from "@/types/todo-item"
import { motion } from "framer-motion"
import { MouseEventHandler } from "react"
import styled from "styled-components"
import Squircle from "./squircle"

type TodoProps = {
  dto: TodoItem
  onClick?: MouseEventHandler<HTMLDivElement>
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
}

export default function Todo({
  dto,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: TodoProps) {
  return (
    <Container
      onClick={onClick}
      className={dto.checked ? "checked" : ""}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
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
  padding: 0 4px;
  margin-left: -4px;
  margin-right: -4px;
  margin-top: 8px;
  border-radius: 0.5rem;

  &.checked {
    svg {
      opacity: 1;
      #fill {
        fill: rgb(var(--colors-lowContrast));
      }
      #outline {
        fill: rgb(var(--colors-lowContrast));
      }
    }
    p {
      color: rgb(var(--colors-lowContrast));
      &:after {
        transform-origin: center left;
        transform: scaleX(1);
      }
    }
  }
`

const Checkbox = styled(Squircle)`
  fill: rgb(var(--colors-highContrast));
  opacity: 0.8;
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
    background: rgb(var(--colors-lowContrast));
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