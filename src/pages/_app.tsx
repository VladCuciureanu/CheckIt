import GlobalStyle from "@/styles/global"
import { seo } from "@/utils/seo"
import { DefaultSeo } from "next-seo"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Header from "@/ui/shared/header"
import useLocalStorage from "@/hooks/use-local-storage"
import { createContext } from "react"

export const BlurringContext = createContext<{
  blurring: boolean
  setBlurring: Function
}>({
  blurring: false,
  setBlurring: () => {},
})

function App({ Component, pageProps, router }: AppProps) {
  const [blurring, setBlurring] = useLocalStorage("blurring", false)

  return (
    <>
      <GlobalStyle />
      <DefaultSeo {...seo} />
      <ThemeProvider defaultTheme="dark">
        <BlurringContext.Provider value={{ blurring, setBlurring }}>
          <Header />
          <Component {...pageProps} key={router.route} />
        </BlurringContext.Provider>
      </ThemeProvider>
    </>
  )
}

export default App
