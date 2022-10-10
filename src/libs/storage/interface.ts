import { TodoItem } from "../../types/todo-item"

export type StorageServiceInterface = {
  getItems: () => TodoItem[]
  addItem: (item: TodoItem) => void
  updateItem: (oldItem: TodoItem, newItem: Partial<TodoItem>) => void
  deleteItem: (item: TodoItem) => void
}
