import {
  TodoItemsContext,
  TodoItemsDispatchContext,
} from "@/contexts/todo-items";
import { useContext } from "react";

export function useTodoItems() {
  return useContext(TodoItemsContext);
}

export function useTodoItemsDispatch() {
  return useContext(TodoItemsDispatchContext);
}
