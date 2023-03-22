"use client";
import InputField from "@/components/Index/Input";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import TodoItem from "@/components/Index/TodoItem";
import { TodoItemData } from "@/types/todo-item-data";

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
      {todoItems.map((item, index) => (
        <TodoItem key={index} data={item} />
      ))}
    </main>
  );
}

const mockData: TodoItemData[] = [
  {
    checked: true,
    content: "aeet",
    children: [
      { checked: false, content: "beet", children: [] },
      { checked: true, content: "ceet", children: [], color: "#F00" },
    ],
  },
  { checked: false, content: "deet", children: [] },
  { checked: true, content: "eeet", children: [] },
];
