import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import styles from "./index.module.scss";
import { CSSProperties } from "react";
import { useSettings } from "@/hooks/settings";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import TodoContext from "./Context";
import TodoContextMenu from "./Context";

type TodoProps = {
  data: TodoItem;
  overrideBlur?: boolean;
};

export default function Todo(props: TodoProps) {
  const settings = useSettings();
  const todoItems = useTodoItems();
  const todoItemsDispatcher = useTodoItemsDispatch();

  const childNodes =
    todoItems?.filter((item) => item.parent === props.data.id) ?? [];

  const shouldBlur =
    props.overrideBlur || (settings?.blurred && props.data.checked);

  const style = {
    "--custom-color": props.data.color
      ? `rgb(var(--${props.data.color}))`
      : "rgb(var(--gray4))",
    filter: shouldBlur ? "blur(.1rem)" : undefined,
    opacity: shouldBlur ? 0.25 : undefined,
  } as CSSProperties;

  const handleChange = () => {
    todoItemsDispatcher!({
      type: TodoItemsAction.Update,
      payload: { ...props.data, checked: !props.data.checked },
    });
  };

  return (
    <>
      <TodoContextMenu data={props.data}>
        <div
          className={styles.Container}
          style={style}
          onMouseDown={(event) => console.log(event)}
        >
          <input
            className={styles.Checkbox}
            checked={props.data.checked}
            type={"checkbox"}
            onChange={handleChange}
          />
          {props.data.content}
        </div>
      </TodoContextMenu>
      {childNodes?.length > 0 && (
        <div className={styles.ChildrenContainer}>
          {childNodes.map((item) => (
            <Todo key={item.id} data={item} overrideBlur={shouldBlur} />
          ))}
        </div>
      )}
    </>
  );
}
