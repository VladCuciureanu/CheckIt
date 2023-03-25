import { TodoItemData, TodoItemsAction } from "@/types/todo-items";

export default function TodoItemsReducer(
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
