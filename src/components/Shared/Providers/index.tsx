"use client";
import { SettingsProvider } from "@/contexts/settings";
import { TodoItemsProvider } from "@/contexts/todo-items";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <TodoItemsProvider>{children}</TodoItemsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
