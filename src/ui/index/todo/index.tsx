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
      opacity: 0.25;
      #fill {
        fill: rgb(var(--colors-lowContrast));
      }
      #outline {
        fill: rgb(var(--colors-lowContrast));
      }
    }
    p {
      color: rgba(var(--colors-lowContrast), 0.5);
      text-decoration-color: rgba(var(--colors-lowContrast), 0.5);
    }
  }
`

const Checkbox = styled(Squircle)`
  fill: rgb(var(--colors-highContrast));
  opacity: 0.8;
  max-width: 1.5rem;
  max-height: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
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
  text-decoration: line-through;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.3s ease;
`

const DeleteContextMenuItem = styled(ContextMenuItem)`
  color: rgb(var(--colors-red-9));
  padding: 0.35rem;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: rgba(var(--colors-lowContrast), 0.05);
  &:hover {
    background-color: rgba(var(--colors-highContrast), 0.15);
    cursor: pointer;
  }
`

const StyledContextMenuContent = styled(ContextMenuContent)`
  background-color: rgba(var(--colors-bg));
  border: 1px solid rgba(var(--colors-lowContrast), 0.5);
  padding: 0.4rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  z-index: 10;
`
