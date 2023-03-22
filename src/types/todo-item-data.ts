export type TodoItemData = {
  id: string;
  checked: boolean;
  content: string;
  children: TodoItemData[];
  color?: string;
};
