import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/Shared/Header/Logo";
import HeaderMenu from "@/components/Shared/Header/Menu";
import styles from "./layout.module.scss";
import { SettingsProvider } from "@/hooks/settings";

export const metadata = {
  title: "CheckIt",
  description: "Productivity at your fingertips.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={styles.Body}>
        <SettingsProvider>
          <div className={styles.Container}>
            <header className={styles.Header}>
              <HeaderLogo />
              <HeaderMenu />
            </header>
            {children}
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
