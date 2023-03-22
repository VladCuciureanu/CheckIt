export type TodoItemData = {
  checked: boolean;
  content: string;
  children: TodoItemData[];
};
