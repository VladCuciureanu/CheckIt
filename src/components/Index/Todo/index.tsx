import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import styles from "./index.module.scss";
import { CSSProperties, Fragment, useEffect, useState } from "react";
import { useSettings } from "@/hooks/settings";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import TodoContextMenu from "./Context";
import { HighlighterColors } from "@/constants/highlighter-colors";
import TodoInput from "./Input";
import { useDrag } from "react-dnd";
import TodoDropzone from "./Dropzone";

type TodoProps = {
  data: TodoItem;
  overrideBlur?: boolean;
};

export default function Todo(props: TodoProps) {
  const [content, setContent] = useState(props.data.content);

  const [{ isDragging }, dragRef] = useDrag({
    type: "todo",
    item: { id: props.data.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const settings = useSettings();
  const todoItems = useTodoItems();
  const todoItemsDispatcher = useTodoItemsDispatch();

  const childNodes =
    todoItems?.filter((item) => item.parent === props.data.id) ?? [];

  const shouldBlur =
    isDragging ||
    props.overrideBlur ||
    (settings?.blurred && props.data.checked);

  const style = {
    "--custom-color": props.data.color
      ? `rgb(var(--${props.data.color}))`
      : `rgb(var(--${HighlighterColors.Gray}))`,
    filter: shouldBlur ? "blur(.1rem)" : undefined,
    opacity: shouldBlur ? 0.25 : undefined,
  } as CSSProperties;

  const handleCheck = () => {
    todoItemsDispatcher!({
      type: TodoItemsAction.Update,
      payload: { ...props.data, checked: !props.data.checked },
    });
  };

  useEffect(() => {
    todoItemsDispatcher!({
      type: TodoItemsAction.Update,
      payload: { ...props.data, content },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, todoItemsDispatcher]);

  return (
    <>
      <TodoContextMenu data={props.data}>
        <div className={styles.Container} style={style} ref={dragRef}>
          <input
            className={styles.Checkbox}
            checked={props.data.checked}
            type={"checkbox"}
            onChange={handleCheck}
          />
          <TodoInput value={content} onChange={setContent} />
        </div>
      </TodoContextMenu>
      <div className={styles.DropzonesContainer}>
        {childNodes.length < 1 ? (
          <TodoDropzone
            key={`${props.data.id}-dz-main`}
            underId={props.data.id}
          />
        ) : (
          <div />
        )}

        <TodoDropzone
          key={`${props.data.id}-dz-secondary`}
          parentId={props.data.id}
        />
      </div>
      {childNodes?.length > 0 && (
        <div className={styles.ChildrenContainer}>
          {childNodes.map((item) => (
            <Fragment key={item.id}>
              <Todo key={item.id} data={item} overrideBlur={shouldBlur} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
