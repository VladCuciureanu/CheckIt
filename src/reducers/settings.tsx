import { Settings, SettingsAction } from "@/types/settings";

export default function SettingsReducer(
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
