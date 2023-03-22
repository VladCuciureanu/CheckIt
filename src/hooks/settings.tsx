"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const DefaultSettings: Settings = {
  blurred: false,
  theme: "auto",
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, DefaultSettings);

  useEffect(() => {
    const data = localStorage.getItem(LocalStorageKey);
    if (data) {
      dispatch({
        type: SettingsAction.Init,
        payload: JSON.parse(data),
      });
    }
  }, []);

  useEffect(() => {
    if (settings !== DefaultSettings) {
      localStorage.setItem(LocalStorageKey, JSON.stringify(settings));
    }
  }, [settings]);

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

function settingsReducer(
  settings: Settings,
  action: {
    type: SettingsAction;
    payload: any;
  }
) {
  switch (action.type) {
    case SettingsAction.Init: {
      return action.payload;
    }

    case SettingsAction.ToggleBlur: {
      return {
        ...settings,
        blurred: !settings.blurred,
      };
    }

    case SettingsAction.ToggleTheme: {
      let newTheme;
      switch (settings.theme) {
        case "auto":
          newTheme = "dark";
          break;
        case "dark":
          newTheme = "light";
          break;
        case "light":
          newTheme = "auto";
          break;
      }
      return {
        ...settings,
        theme: newTheme,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const LocalStorageKey = "settings";

type Settings = {
  blurred: boolean;
  theme: "light" | "dark" | "auto";
};

const SettingsContext = createContext<Settings | null>(null);

const SettingsDispatchContext = createContext<Dispatch<any> | null>(null);

export enum SettingsAction {
  Init,
  ToggleBlur,
  ToggleTheme,
}
