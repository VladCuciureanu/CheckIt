"use client";
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
import DropdownMenu from "../../Radix/Menu/Dropdown";
import ClearAlert from "../../Radix/Dialogs/ClearAlert";

export default function HeaderMenu() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
    <>
      <DropdownMenu.Root onOpenChange={(value) => setMenuOpen(value)}>
        <DropdownMenu.Trigger asChild>
          <Button>{menuOpen ? <XIcon /> : <HamburgerIcon />}</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item
              onClick={() => {
                settingsDispatch({ type: SettingsAction.ToggleBlur });
              }}
            >
              Toggle Blur <DropdownMenu.RightSlot>⌃B</DropdownMenu.RightSlot>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => setTheme(getNextThemeInRotation(theme as UITheme))}
            >
              Toggle Theme <DropdownMenu.RightSlot>⌃T</DropdownMenu.RightSlot>
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => exportData()}>
              Export <DropdownMenu.RightSlot>⌃S</DropdownMenu.RightSlot>
            </DropdownMenu.Item>
            <DropdownMenu.DangerousItem
              onClick={() => setDeleteDialogOpen(true)}
            >
              Clear Board <DropdownMenu.RightSlot>⌃X</DropdownMenu.RightSlot>
            </DropdownMenu.DangerousItem>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <ClearAlert
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onAccept={() => todoItemsDispatch!({ type: TodoItemsAction.Clear })}
      />
    </>
  );
}
