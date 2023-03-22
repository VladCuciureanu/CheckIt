"use client";
import InputField from "@/components/Index/Input";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const [input, setInput] = useState<string>("");

  const createItem = (event: FormEvent<HTMLFormElement>) => {
    console.log(input);
    setInput("");
    event.preventDefault();
  };
  return (
    <main className={styles.Container}>
      <InputField
        value={input}
        isEmpty={input.length < 1}
        onChange={(event) => setInput(event.target.value)}
        onSubmit={(event) => createItem(event)}
      />
    </main>
  );
}
