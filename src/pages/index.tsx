import { TodoItem } from "@/types/todo-item"
import { useState } from "react"
import { v4 as uuidV4 } from "uuid"
import Layout from "@/ui/shared/layout"
import TodoInputBox from "@/ui/index/input"
import useLocalStorage from "@/hooks/use-local-storage"
import Todo from "@/ui/index/todo"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const [todoItems, setTodoItems] = useLocalStorage<TodoItem[]>(
    "CHECK_IT_STORAGE",
    [],
  )

  return (
    <Layout>
      <TodoInputBox
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onSubmit={(event) => {
          setTodoItems([
            ...todoItems,
            { id: uuidV4(), label: inputValue, checked: false },
          ])
          event.preventDefault()
        }}
      />
      {todoItems
        .sort((a, b) => Number(a.checked) - Number(b.checked))
        .map((item) => (
          <Todo
            key={item.id}
            dto={item}
            onClick={() => {
              const checkedItem = item
              checkedItem.checked = !checkedItem.checked
              setTodoItems([
                checkedItem,
                ...todoItems.filter((it) => it !== item),
              ])
            }}
          />
        ))}
    </Layout>
  )
}
