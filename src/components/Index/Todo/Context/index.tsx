import { ReactNode } from "react";
import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import { useTodoItemsDispatch } from "@/hooks/todo-items";
import ContextMenu from "@/components/Shared/Radix/Menu/Context";

export default function TodoContextMenu({
  children,
  data,
}: {
  children: ReactNode;
  data: TodoItem;
}) {
  const todoItemDispatch = useTodoItemsDispatch();

  const handleColorChange = (color: string) => {
    todoItemDispatch!({
      type: TodoItemsAction.Update,
      payload: { ...data, color },
    });
  };

  const handleDelete = () => {
    todoItemDispatch!({ type: TodoItemsAction.Delete, payload: data });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>
              Colors
              <ContextMenu.RightSlot>{`>`}</ContextMenu.RightSlot>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent sideOffset={-2} alignOffset={-5}>
                <ContextMenu.Item onClick={() => handleColorChange("red4")}>
                  Red
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("orange4")}>
                  Orange
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("yellow4")}>
                  Yellow
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("green4")}>
                  Green
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("blue4")}>
                  Blue
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("purple4")}>
                  Purple
                </ContextMenu.Item>
                <ContextMenu.Item onClick={() => handleColorChange("gray4")}>
                  Gray
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.DangerousItem onClick={handleDelete}>
            Delete
          </ContextMenu.DangerousItem>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
