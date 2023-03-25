"use client";
import InputField from "@/components/Index/Input";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import TodoItem from "@/components/Index/Todo";
import { TodoItemData, TodoItemsAction } from "@/types/todo-items";
import KeyPressListener from "@/components/Shared/KeyPressListener";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { v4 } from "uuid";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const todoItems = useTodoItems() ?? [];
  const todoItemsDispatch = useTodoItemsDispatch();

  const createItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoItemsDispatch) {
      todoItemsDispatch({
        type: TodoItemsAction.Create,
        payload: {
          id: v4(),
          checked: false,
          content: input,
        } as TodoItemData,
      });
    }
    setInput("");
  };

  return (
    <main className={styles.Container}>
      <InputField
        value={input}
        isEmpty={input.length < 1}
        onChange={(event) => setInput(event.target.value)}
        onSubmit={(event) => createItem(event)}
      />
      {todoItems
        .filter((item) => item.parent === undefined)
        .map((item) => (
          <TodoItem key={item.id} data={item} />
        ))}
      <KeyPressListener />
    </main>
  );
}
