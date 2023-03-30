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

      // If pivot item is the item itself, cancel action.
      if ([parentId, underId, aboveId].includes(id)) {
        return todoItems;
      }

      // If hierarchy of any parameter items contains the item itself, cancel action.
      var hierarchyIds: string[] = [];
      const paramIds = [parentId, underId, aboveId];
      paramIds.forEach((itId) => {
        var currentId = itId;
        while (currentId !== undefined) {
          hierarchyIds.push(currentId);
          const currentItem = todoItems.find((it) => it.id === currentId);
          if (currentItem === undefined) {
            throw "An error occured.";
          }
          currentId = currentItem.parent;
        }
      });
      if (hierarchyIds.includes(id)) {
        return todoItems;
      }

      // Try to find reordered item
      let item = todoItems.find((it) => it.id === id);
      if (item === undefined) {
        throw "Could not find reordered item.";
      }

      // Filter other items
      let filteredItems = todoItems.filter((it) => it.id !== item?.id);

      // Reparenting
      if (parentId) {
        item.parent = parentId;
        return [item, ...filteredItems];
      }

      // Reordering
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
