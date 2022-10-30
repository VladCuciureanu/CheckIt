import { TodoItem } from "@/types/todo-item"
import { ContextMenu, ContextMenuTrigger } from "@radix-ui/react-context-menu"
import { MouseEventHandler, useContext } from "react"
import Trash from "@/ui/shared/graphics/trash"
import Styles from "./styles"
import { BlurringContext } from "@/pages/_app"

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
  const { blurring } = useContext(BlurringContext)
  var classes: string[] = []
  if (dto.checked) {
    classes = ["checked", ...classes]
  }
  if (blurring) {
    classes = ["blurring", ...classes]
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Container
          onClick={onClick}
          className={classes.length ? classes.join(" ") : ""}
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
