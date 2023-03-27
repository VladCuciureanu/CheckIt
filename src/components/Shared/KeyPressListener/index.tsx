import { getNextThemeInRotation } from "@/constants/themes";
import { useSettingsDispatch } from "@/hooks/settings";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { SettingsAction } from "@/types/settings";
import { UITheme } from "@/types/themes";
import { TodoItemsAction } from "@/types/todo-items";
import { download } from "@/utils/download";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import ClearAlert from "../Dialogs/ClearAlert";

export default function KeyPressListener() {
  const { theme, setTheme } = useTheme();
  const settingsDispatch = useSettingsDispatch();

  const todoItems = useTodoItems();
  const todoItemsDispatch = useTodoItemsDispatch();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "b":
            settingsDispatch!({ type: SettingsAction.ToggleBlur });
            break;
          case "t":
            setTheme(getNextThemeInRotation(theme as UITheme));
            break;
          case "s":
            download("check-it-data.txt", JSON.stringify(todoItems));
            break;
          case "x":
            setDeleteDialogOpen(true);
            break;
        }
      }
    },
    [setTheme, settingsDispatch, theme, todoItems]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <ClearAlert
      open={deleteDialogOpen}
      onClose={() => setDeleteDialogOpen(false)}
      onAccept={() => todoItemsDispatch!({ type: TodoItemsAction.Clear })}
    />
  );
}
