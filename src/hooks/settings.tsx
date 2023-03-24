"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

export enum SettingsAction {
  Init,
  ToggleBlur,
}

type Settings = {
  blurred: boolean;
};

export const SettingsLocalStorageKey = "settings";
const SettingsContext = createContext<Settings | null>(null);
const SettingsDispatchContext = createContext<Dispatch<any> | null>(null);

const DefaultSettings: Settings = {
  blurred: false,
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(settingsReducer, DefaultSettings);

  useEffect(() => {
    const data = localStorage.getItem(SettingsLocalStorageKey);
    if (data) {
      dispatch({
        type: SettingsAction.Init,
        payload: JSON.parse(data),
      });
    }
  }, []);

  useEffect(() => {
    if (settings !== DefaultSettings) {
      localStorage.setItem(SettingsLocalStorageKey, JSON.stringify(settings));
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

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
