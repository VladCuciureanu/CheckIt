import { TodoItem, TodoItemsAction } from "@/types/todo-items";

export default function TodoItemsReducer(
  todoItems: TodoItem[],
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
      return [action.payload as TodoItem, ...todoItems];
    }

    case TodoItemsAction.Update: {
      return [
        ...todoItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      ];
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
