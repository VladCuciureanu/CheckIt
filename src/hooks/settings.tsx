import { SettingsContext, SettingsDispatchContext } from "@/contexts/settings";
import { useContext } from "react";

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}
