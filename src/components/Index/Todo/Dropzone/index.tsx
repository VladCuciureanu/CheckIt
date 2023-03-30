import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { TodoItemsAction } from "@/types/todo-items";
import { ComponentProps, useEffect } from "react";
import { useDrop } from "react-dnd";
import styles from "./index.module.scss";

type TodoDropzoneProps = {
  parentId?: string;
  underId?: string;
  aboveId?: string;
} & ComponentProps<"div">;

export default function TodoDropzone(props: TodoDropzoneProps) {
  const { parentId, underId, aboveId, ...divProps } = props;
  const todoItemsDispatch = useTodoItemsDispatch();
  const [{ isOver }, dropRef] = useDrop({
    accept: "todo",
    drop: (item) => {
      const id = (item as any).id;
      todoItemsDispatch!({
        type: TodoItemsAction.Reorder,
        payload: { id, parentId, underId, aboveId },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      className={isOver ? styles.HoveredIndicator : styles.Indicator}
      ref={dropRef}
      {...divProps}
    ></div>
  );
}
