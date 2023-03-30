"use client";
import InputField from "@/components/Index/Input";
import { FormEvent, Fragment, useState } from "react";
import styles from "./page.module.scss";
import Todo from "@/components/Index/Todo";
import { TodoItem, TodoItemsAction } from "@/types/todo-items";
import KeyPressListener from "@/components/Shared/KeyPressListener";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { v4 } from "uuid";
import TodoDropzone from "@/components/Index/Todo/Dropzone";

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
        } as TodoItem,
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
        .map((item, index) => (
          <Fragment key={item.id}>
            {index === 0 && <TodoDropzone aboveId={item.id} />}
            <Todo key={item.id} data={item} />
          </Fragment>
        ))}
      <KeyPressListener />
    </main>
  );
}
