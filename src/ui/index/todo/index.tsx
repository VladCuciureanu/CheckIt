import { TodoItem } from "@/types/todo-item"
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu"
import { MouseEventHandler } from "react"
import Trash from "@/ui/shared/graphics/trash"
import Styles from "./styles"

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
      <Content>
        <DeleteItem onClick={() => onDelete()}>
          <Trash />
          Delete
        </DeleteItem>
      </Content>
    </ContextMenu>
  )
}

const Container = Styles.Container
const Checkbox = Styles.Checkbox
const Label = Styles.Label
const Content = Styles.StyledContextMenuContent
const DeleteItem = Styles.DeleteContextMenuItem
