import { UITheme, getNextThemeInRotation } from "@/constants/themes";
import { useSettingsDispatch } from "@/hooks/settings";
import { useTodoItems, useTodoItemsDispatch } from "@/hooks/todo-items";
import { SettingsAction } from "@/types/settings";
import { TodoItemsAction } from "@/types/todo-items";
import { download } from "@/utils/download";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

export default function KeyPressListener() {
  const settingsDispatch = useSettingsDispatch();
  const todoItemsDispatch = useTodoItemsDispatch();
  const { theme, setTheme } = useTheme();
  const todoItems = useTodoItems();

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
            todoItemsDispatch!({ type: TodoItemsAction.Clear });
            break;
        }
      }
    },
    [setTheme, settingsDispatch, theme, todoItems, todoItemsDispatch]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <></>;
}
