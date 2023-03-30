"use client";
import { SettingsProvider } from "@/contexts/settings";
import { TodoItemsProvider } from "@/contexts/todo-items";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider>
        <TodoItemsProvider>
          <DndProvider options={HTML5toTouch}>{children}</DndProvider>
        </TodoItemsProvider>
      </ThemeProvider>
    </SettingsProvider>
  );
}
