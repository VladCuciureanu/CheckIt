"use client";
import InputField from "@/components/Index/Input";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import TodoItem from "@/components/Index/TodoItem";
import { TodoItemData } from "@/types/todo-item-data";
import KeyPressListener from "@/components/Shared/KeyPressListener";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const createItem = (event: FormEvent<HTMLFormElement>) => {
    console.log(input);
    setInput("");
    event.preventDefault();
  };

  const todoItems = mockData; //TODO;

  return (
    <main className={styles.Container}>
      <InputField
        value={input}
        isEmpty={input.length < 1}
        onChange={(event) => setInput(event.target.value)}
        onSubmit={(event) => createItem(event)}
      />
      {todoItems.map((item) => (
        <TodoItem key={item.id} data={item} />
      ))}
      <KeyPressListener />
    </main>
  );
}

const mockData: TodoItemData[] = [
  {
    id: "9b54572f-de4a-4235-b82f-71dc3d35f0f9",
    checked: true,
    content: "aeet",
    children: [
      {
        id: "0f2bef70-905e-4764-a353-a42d76360389",
        checked: false,
        content: "beet",
        children: [],
      },
      {
        id: "92bb2050-43f7-46d1-820e-ef7dbf0534c9",
        checked: true,
        content: "ceet",
        children: [],
        color: "#F00",
      },
    ],
  },
  {
    id: "85d78829-ae35-48a3-a250-11781c991e16",
    checked: false,
    content: "deet",
    children: [],
  },
  {
    id: "adb05e07-a422-4a24-a5a5-53596c3c33ed",
    checked: true,
    content: "eeet",
    children: [],
  },
];
