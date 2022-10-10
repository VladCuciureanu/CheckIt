import Todo from "@/ui/index/todo"
import { TodoItem } from "@/types/todo-item"
import { useEffect, useState } from "react"
import StorageService from "../libs/storage"
import Layout from "@/ui/shared/layout"
import TodoInputBox from "@/ui/index/input"

export default function HomePage() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [newItemLabel, setNewItemLabel] = useState("")

  useEffect(() => {
    window.addEventListener("storage", () => {
      setTodoItems(StorageService.getItems())
    })

    window.dispatchEvent(new Event("storage"))
  }, [])

  const handleToggle = () => {}

  return (
    <Layout>
      <TodoInputBox />
      {(todoItems as TodoItem[])
        .sort((a, b) => (a.checked ? 1 : 0) - (b.checked ? 1 : 0))
        .map((item: TodoItem, index: number) => (
          <Todo key={index} dto={item} handleToggle={() => handleToggle()} />
        ))}
    </Layout>
  )
}
