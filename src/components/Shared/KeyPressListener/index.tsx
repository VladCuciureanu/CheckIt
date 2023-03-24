import { UITheme, getNextThemeInRotation } from "@/constants/themes";
import { SettingsAction, useSettingsDispatch } from "@/hooks/settings";
import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

export default function KeyPressListener() {
  const settingsDispatch = useSettingsDispatch() ?? placeholderDispatch;
  const { theme, setTheme } = useTheme();

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case "b":
            settingsDispatch({ type: SettingsAction.ToggleBlur });
            break;
          case "t":
            setTheme(getNextThemeInRotation(theme as UITheme));
            break;
          case "s":
            console.log("Tried to save board. Not yet implemented. Oops 😅");
            break;
          case "x":
            if (event.shiftKey) {
              console.log(
                "Tried to delete board. Not yet implemented. Oops 😅"
              );
            }
            break;
        }
      }
    },
    [setTheme, settingsDispatch, theme]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <></>;
}

const placeholderDispatch = () => {
  console.warn("Dispatcher is not initialized. Try again later.");
};
