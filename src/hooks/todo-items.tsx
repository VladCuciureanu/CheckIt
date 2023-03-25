"use client";
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
        JSON.stringify(DefaultData)
      );
      dispatch({
        type: TodoItemsAction.Init,
        payload: DefaultData,
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

const DefaultData: TodoItemData[] = [
  {
    id: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
    checked: true,
    content: "aeet",
  },
  {
    id: "0f2bef70-905e-4764-a353-a42d76360389",
    checked: false,
    content: "beet",
    parent: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
  },
  {
    id: "92bb2050-43f7-46d1-820e-ef7dbf0534c9",
    checked: true,
    content: "ceet",
    color: "#F00",
    parent: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
  },
  {
    id: "85d78829-ae35-48a3-a250-11781c991e16",
    checked: false,
    content: "deet",
  },
  {
    id: "adb05e07-a422-4a24-a5a5-53596c3c33ed",
    checked: true,
    content: "eeet",
  },
];
