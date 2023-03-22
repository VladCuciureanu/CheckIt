import { TodoItemData } from "@/types/todo-item-data";
import styles from "./index.module.scss";
import { CSSProperties } from "react";

type TodoItemProps = {
  data: TodoItemData;
};

export default function TodoItem(props: TodoItemProps) {
  const style = {
    "--background-color": props.data.color ?? "var(--accent-color-2)",
  } as CSSProperties;

  return (
    <>
      <div className={styles.Container} style={style}>
        <input
          className={styles.Checkbox}
          checked={props.data.checked}
          type={"checkbox"}
        />
        {props.data.content}
      </div>
      {props.data.children.length > 0 && (
        <div className={styles.ChildrenContainer}>
          {props.data.children.map((item) => (
            <TodoItem key={item.id} data={item} />
          ))}
        </div>
      )}
    </>
  );
}
