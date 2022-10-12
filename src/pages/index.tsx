import { TodoItem } from "@/types/todo-item"
import { useState } from "react"
import { v4 as uuidV4 } from "uuid"
import Layout from "@/ui/shared/layout"
import TodoInputBox from "@/ui/index/input"
import useLocalStorage from "@/hooks/use-local-storage"
import Todo from "@/ui/index/todo"
import Slider from "@/ui/index/slider"
import styled from "styled-components"

export default function HomePage() {
  const [inputValue, setInputValue] = useState("")
  const [hoveredElement, setHoveredElement] = useState<any | undefined>()
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
          setInputValue("")
          event.preventDefault()
        }}
        onMouseEnter={(event) => setHoveredElement(event)}
        onMouseLeave={() => setHoveredElement(undefined)}
      />
      <Divider />
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
            onMouseEnter={(event) => setHoveredElement(event)}
            onMouseLeave={() => setHoveredElement(undefined)}
          />
        ))}
      <Slider hoveredElement={hoveredElement} />
    </Layout>
  )
}

const Divider = styled.div`
  min-height: 1px;
  min-width: 100%;
  background-color: rgba(var(--colors-lowContrast), 0.5);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`
