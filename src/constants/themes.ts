import { UITheme } from "@/types/themes";

export const getNextThemeInRotation = (currentTheme: UITheme) => {
  switch (currentTheme) {
    case UITheme.System:
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return systemPrefersDark ? UITheme.Light : UITheme.Dark;
    case UITheme.Dark:
      return UITheme.Light;
    case UITheme.Light:
      return UITheme.Dark;
  }
};
