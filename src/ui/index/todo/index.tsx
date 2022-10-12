import { TodoItem } from "@/types/todo-item"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu"
import { motion } from "framer-motion"
import { MouseEventHandler } from "react"
import styled from "styled-components"
import Squircle from "../../shared/graphics/squircle"

type TodoProps = {
  dto: TodoItem
  onClick?: MouseEventHandler<HTMLDivElement>
  onMouseEnter?: MouseEventHandler<HTMLDivElement>
  onMouseLeave?: MouseEventHandler<HTMLDivElement>
  onDelete: () => void
}

export default function Todo({
  dto,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDelete,
}: TodoProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Container
          onClick={onClick}
          className={dto.checked ? "checked" : ""}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Checkbox />
          <Label>{dto.label}</Label>
        </Container>
      </ContextMenuTrigger>
      <StyledContextMenuContent>
        <DeleteContextMenuItem onClick={() => onDelete()}>
          Delete
        </DeleteContextMenuItem>
      </StyledContextMenuContent>
    </ContextMenu>
  )
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0;
  border-radius: 0.5rem;
  user-select: none;

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
  margin-top: 0.05rem;
  #fill {
    fill: transparent;
  }
  transition: opacity 0.3s ease;
`

const Label = styled.p`
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  font-weight: 400;
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

const DeleteContextMenuItem = styled(ContextMenuItem)`
  color: rgb(var(--colors-red-9));
  padding: 0.35rem;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(var(--colors-highContrast), 0.25);
    cursor: pointer;
  }
`

const StyledContextMenuContent = styled(ContextMenuContent)`
  background-color: rgb(var(--colors-lowContrast));
  padding: 0.4rem;
  border: 0;
  border-radius: 0.5rem;
  box-sizing: border-box;
  z-index: 10;
`
