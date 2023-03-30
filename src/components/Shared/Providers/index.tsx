"use client";
import { SettingsProvider } from "@/contexts/settings";
import { TodoItemsProvider } from "@/contexts/todo-items";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <TodoItemsProvider>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </TodoItemsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
