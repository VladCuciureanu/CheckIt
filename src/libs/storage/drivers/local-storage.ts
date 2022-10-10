import { TodoItem } from "@/types/todo-item"
import { StorageServiceInterface } from "../interface"
import { v4 as uuidv4 } from "uuid"

const localStorageKey = "CHECK_IT_STORAGE"

type DataStruct = {
  data: TodoItem[]
}

export default class LocalStorageService implements StorageServiceInterface {
  getItems(): TodoItem[] {
    if (typeof window === "undefined") {
      return []
    }

    if (localStorage.getItem(localStorageKey) === null) {
      const blankStruct: DataStruct = {
        data: [],
      }
      localStorage.setItem(localStorageKey, JSON.stringify(blankStruct))
    }

    try {
      return (JSON.parse(localStorage.getItem(localStorageKey)!) as DataStruct)
        .data
    } catch (error) {
      console.trace(error)
      return []
    }
  }

  addItem(item: TodoItem): void {
    item.id = uuidv4()
    const items = this.getItems()
    this._setItems([item, ...items])
  }

  updateItem(oldItem: TodoItem, newItem: Partial<TodoItem>): void {
    const items = this.getItems()
    const itemIndex = items.findIndex((i) => i.id === oldItem.id)
    if (itemIndex > -1) {
      if (newItem.label !== undefined) {
        items[itemIndex].label = newItem.label
      }
      if (newItem.checked !== undefined) {
        items[itemIndex].checked = newItem.checked
      }
      this._setItems(items)
    }
  }

  deleteItem(item: TodoItem): void {
    const items = this.getItems()
    const itemIndex = items.findIndex((i) => i.id === item.id)
    if (itemIndex > -1) {
      this._setItems(items.splice(itemIndex, 1))
    }
  }

  _setItems(items: TodoItem[]): void {
    const output: DataStruct = {
      data: items,
    }
    localStorage.setItem(localStorageKey, JSON.stringify(output))
  }
}
