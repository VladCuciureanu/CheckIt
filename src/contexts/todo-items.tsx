import DefaultTodoItems from "@/constants/default-todo-items";
import TodoItemsReducer from "@/reducers/todo-items";
import { TodoItemData, TodoItemsAction } from "@/types/todo-items";
import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
  useEffect,
} from "react";

export const TodoItemsLocalStorageKey = "data";
export const TodoItemsContext = createContext<TodoItemData[] | null>(null);
export const TodoItemsDispatchContext = createContext<Dispatch<any> | null>(
  null
);

export function TodoItemsProvider({ children }: { children: ReactNode }) {
  const [todoItems, dispatch] = useReducer(TodoItemsReducer, []);

  useEffect(() => {
    const data = localStorage.getItem(TodoItemsLocalStorageKey);
    if (data) {
      dispatch({
        type: TodoItemsAction.Init,
        payload: JSON.parse(data),
      });
    } else {
      localStorage.setItem(
        TodoItemsLocalStorageKey,
        JSON.stringify(DefaultTodoItems)
      );
      dispatch({
        type: TodoItemsAction.Init,
        payload: DefaultTodoItems,
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TodoItemsLocalStorageKey, JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <TodoItemsContext.Provider value={todoItems}>
      <TodoItemsDispatchContext.Provider value={dispatch}>
        {children}
      </TodoItemsDispatchContext.Provider>
    </TodoItemsContext.Provider>
  );
}
