export const getNextThemeInRotation = (currentTheme: UITheme) => {
  switch (currentTheme) {
    case UITheme.System:
      return UITheme.Dark;
    case UITheme.Dark:
      return UITheme.Light;
    case UITheme.Light:
      return UITheme.System;
  }
};

export enum UITheme {
  System = "system",
  Dark = "dark",
  Light = "light",
}
