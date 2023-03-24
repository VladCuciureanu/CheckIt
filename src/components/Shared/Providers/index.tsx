"use client";
import { SettingsProvider } from "@/hooks/settings";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SettingsProvider>
  );
}
