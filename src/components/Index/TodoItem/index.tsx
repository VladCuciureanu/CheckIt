import { TodoItemData } from "@/types/todo-item-data";
import styles from "./index.module.scss";
import { CSSProperties } from "react";
import { useSettings } from "@/hooks/settings";

type TodoItemProps = {
  data: TodoItemData;
  overrideBlur?: boolean;
};

export default function TodoItem(props: TodoItemProps) {
  const settings = useSettings();
  const shouldBlur =
    props.overrideBlur || (settings?.blurred && props.data.checked);

  const style = {
    "--background-color": props.data.color ?? "var(--accent-color-2)",
    filter: shouldBlur ? "blur(.1rem)" : undefined,
    opacity: shouldBlur ? 0.25 : undefined,
  } as CSSProperties;

  const handleChange = () => {};

  return (
    <>
      <div className={styles.Container} style={style}>
        <input
          className={styles.Checkbox}
          checked={props.data.checked}
          type={"checkbox"}
          onChange={handleChange}
        />
        {props.data.content}
      </div>
      {props.data.children.length > 0 && (
        <div className={styles.ChildrenContainer}>
          {props.data.children.map((item) => (
            <TodoItem key={item.id} data={item} overrideBlur={shouldBlur} />
          ))}
        </div>
      )}
    </>
  );
}
