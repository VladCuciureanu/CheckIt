"use client";
import DefaultSettings from "@/constants/default-settings";
import SettingsReducer from "@/reducers/settings";
import { Settings, SettingsAction } from "@/types/settings";
import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";

export const SettingsLocalStorageKey = "settings";
export const SettingsContext = createContext<Settings | null>(null);
export const SettingsDispatchContext = createContext<Dispatch<any> | null>(
  null
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, dispatch] = useReducer(SettingsReducer, DefaultSettings);

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
