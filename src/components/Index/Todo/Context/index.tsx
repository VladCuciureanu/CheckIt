import { ReactNode } from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import styles from "./index.module.scss";
import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import { useTodoItemsDispatch } from "@/hooks/todo-items";

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
        <ContextMenu.Content className={styles.Content}>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger className={styles.Item}>
              Colors
              <div className={styles.RightSlot}>{`>`}</div>
            </ContextMenu.SubTrigger>
            <ContextMenu.Portal>
              <ContextMenu.SubContent
                className={styles.Content}
                sideOffset={-2}
                alignOffset={-5}
              >
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("red4")}
                >
                  Red
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("orange4")}
                >
                  Orange
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("yellow4")}
                >
                  Yellow
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("green4")}
                >
                  Green
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("blue4")}
                >
                  Blue
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("purple4")}
                >
                  Purple
                </ContextMenu.Item>
                <ContextMenu.Item
                  className={styles.Item}
                  onClick={() => handleColorChange("gray4")}
                >
                  Gray
                </ContextMenu.Item>
              </ContextMenu.SubContent>
            </ContextMenu.Portal>
          </ContextMenu.Sub>
          <ContextMenu.Item
            className={styles.DangerousItem}
            onClick={handleDelete}
          >
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
