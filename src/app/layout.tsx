/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import HeaderLogo from "@/components/Shared/Header/Logo";
import HeaderMenu from "@/components/Shared/Header/Menu";
import styles from "./layout.module.scss";
import Providers from "@/components/Shared/Providers";

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={styles.Body}>
        <Providers>
          <div className={styles.Container}>
            <header className={styles.Header}>
              <HeaderLogo />
              <HeaderMenu />
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
