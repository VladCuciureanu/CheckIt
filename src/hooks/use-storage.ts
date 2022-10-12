import { TodoItem } from "@/types/todo-item"
import { env } from "process"
import React from "react"
import useLocalStorage from "./use-local-storage"

const useStorage = (): [
  TodoItem[],
  React.Dispatch<React.SetStateAction<TodoItem[]>>,
] => {
  switch (env.STORAGE_TYPE) {
    default:
    case "LOCAL_STORAGE":
      return useLocalStorage<TodoItem[]>("CHECK_IT_STORAGE", [])
  }
}
export default useStorage
