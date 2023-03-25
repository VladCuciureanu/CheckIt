"use client";
import styles from "./index.module.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import HamburgerIcon from "@/assets/icons/Hamburger";
import XIcon from "@/assets/icons/X";
import { useSettingsDispatch } from "@/hooks/settings";
import Button from "../../Button";
import { useTheme } from "next-themes";
import { getNextThemeInRotation } from "@/constants/themes";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { download } from "@/utils/download";
import { SettingsAction } from "@/types/settings";
import { TodoItemsAction } from "@/types/todo-items";
import { UITheme } from "@/types/themes";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const todoItems = useTodoItems();

  const settingsDispatch = useSettingsDispatch();
  const todoItemsDispatch = useTodoItemsDispatch();

  if (settingsDispatch === null) {
    return <></>;
  }

  const exportData = () => {
    download("check-it-data.txt", JSON.stringify(todoItems));
  };

  return (
    <DropdownMenu.Root onOpenChange={(value) => setMenuOpen(value)}>
      <DropdownMenu.Trigger asChild>
        <Button>{menuOpen ? <XIcon /> : <HamburgerIcon />}</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Container} align="end">
          <DropdownMenu.Item
            className={styles.Item}
            onClick={() => {
              settingsDispatch({ type: SettingsAction.ToggleBlur });
            }}
          >
            Toggle Blur <div className={styles.RightSlot}>⌃B</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.Item}
            onClick={() => setTheme(getNextThemeInRotation(theme as UITheme))}
          >
            Toggle Theme <div className={styles.RightSlot}>⌃T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.Item}
            onClick={() => exportData()}
          >
            Export <div className={styles.RightSlot}>⌃S</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={styles.DangerousItem}
            onClick={() => todoItemsDispatch!({ type: TodoItemsAction.Clear })}
          >
            Clear Board <div className={styles.RightSlot}>⌃X</div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
