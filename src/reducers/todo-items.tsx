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

    case TodoItemsAction.Reorder: {
      const { id, parentId, underId, aboveId } = action.payload;

      if ([parentId, underId, aboveId].includes(id)) {
        return todoItems;
      }

      let item = todoItems.find((it) => it.id === id);
      if (item === undefined) {
        throw "Could not find reordered item.";
      }

      let filteredItems = todoItems.filter((it) => it.id !== item?.id);

      if (parentId) {
        item.parent = parentId;
        return [item, ...filteredItems];
      }

      if (underId || aboveId) {
        const pivotItemId = underId || aboveId;
        if (pivotItemId === item.id) {
          return todoItems;
        }
        const pivotItem = filteredItems.find((item) => item.id === pivotItemId);
        if (pivotItem === undefined) {
          throw "Could not find pivot item.";
        }
        const pivotItemIndex = filteredItems.indexOf(pivotItem);
        if (pivotItemIndex === -1) {
          throw "Could not find pivot item index.";
        }
        item.parent = pivotItem.parent;
        const spliceIndex = underId ? pivotItemIndex + 1 : pivotItemIndex;
        filteredItems.splice(spliceIndex, 0, item);
        return filteredItems;
      }
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
