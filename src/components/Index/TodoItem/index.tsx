import { TodoItemData } from "@/types/todo-item-data";
import styles from "./index.module.scss";

type TodoItemProps = {
  data: TodoItemData;
};

export default function TodoItem(props: TodoItemProps) {
  return (
    <>
      <div className={styles.Container}>
        <input
          className={styles.Checkbox}
          checked={props.data.checked}
          type={"checkbox"}
        />
        {props.data.content}
      </div>
      {props.data.children.length > 0 && (
        <div className={styles.ChildrenContainer}>
          {props.data.children.map((item, index) => (
            <TodoItem key={index} data={item} />
          ))}
        </div>
      )}
    </>
  );
}
