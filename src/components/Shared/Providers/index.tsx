"use client";
import { SettingsProvider } from "@/hooks/settings";
import { TodoItemsProvider } from "@/hooks/todo-items";
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
