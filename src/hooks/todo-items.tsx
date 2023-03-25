"use client";
import DefaultTodoItems from "@/constants/default-todo-items";
import { TodoItemData } from "@/types/todo-item";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export enum TodoItemsAction {
  Init,
  Create,
  Update,
  Delete,
  Clear,
}

export const TodoItemsLocalStorageKey = "data";
const TodoItemsContext = createContext<TodoItemData[] | null>(null);
const TodoItemsDispatchContext = createContext<Dispatch<any> | null>(null);

export function TodoItemsProvider({ children }: { children: ReactNode }) {
  const [todoItems, dispatch] = useReducer(todoItemsReducer, []);

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

export function useTodoItems() {
  return useContext(TodoItemsContext);
}

export function useTodoItemsDispatch() {
  return useContext(TodoItemsDispatchContext);
}

function todoItemsReducer(
  todoItems: TodoItemData[],
  action: {
    type: TodoItemsAction;
    payload: any;
  }
) {
  switch (action.type) {
    case TodoItemsAction.Init: {
      return action.payload;
    }

    case TodoItemsAction.Create: {
      return [action.payload as TodoItemData, ...todoItems];
    }

    case TodoItemsAction.Update: {
      const otherItems = todoItems.filter(
        (item) => item.id !== action.payload.id
      );
      return [action.payload, ...otherItems];
    }

    case TodoItemsAction.Delete: {
      return todoItems.filter((item) => item.id !== action.payload.id);
    }

    case TodoItemsAction.Clear: {
      return [];
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
