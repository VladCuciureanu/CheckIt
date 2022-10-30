import useStorage from "@/hooks/use-storage"
import { BlurringContext } from "@/pages/_app"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import { useCallback, useContext, useEffect, useState } from "react"
import Styles from "./styles"

export default function HeaderMenu() {
  const [_, setStorage] = useStorage()
  const { theme, setTheme } = useTheme()
  const [metaKeySymbol, setMetaKeySymbol] = useState("")
  const { blurring, setBlurring } = useContext(BlurringContext)

  const toggleTheme = useCallback(
    () => setTheme(theme === "light" ? "dark" : "light"),
    [setTheme, theme],
  )

  const toggleBlurring = useCallback(() => {
    setBlurring(!blurring)
  }, [blurring, setBlurring])

  const clearItems = useCallback(() => {
    setStorage([])
    location.reload()
  }, [setStorage])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === "KeyK" && event.metaKey) {
        toggleTheme()
      }
      if (event.code === "KeyB" && event.metaKey) {
        toggleBlurring()
      }
      if (event.code === "KeyX" && event.ctrlKey && event.shiftKey) {
        clearItems()
      }
    },
    [clearItems, toggleBlurring, toggleTheme],
  )

  useEffect(() => {
    navigator.platform.includes("Mac")
      ? setMetaKeySymbol("⌘")
      : setMetaKeySymbol("Win")
    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [handleKeyPress])

  return (
    <DropdownMenu.Root>
      <Trigger>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </Trigger>
      <DropdownMenu.Portal>
        <Content align="end">
          <Item onClick={() => toggleTheme()}>
            Toggle Theme <RightSlot>{metaKeySymbol}+K</RightSlot>
          </Item>
          <Item onClick={() => toggleBlurring()}>
            Toggle Blurring <RightSlot>{metaKeySymbol}+B</RightSlot>
          </Item>
          <DangerousItem onClick={() => clearItems()}>
            Clear Items <RightSlot>⌃+⇧+X</RightSlot>
          </DangerousItem>
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const Trigger = Styles.Trigger
const Content = Styles.Content
const Item = Styles.Item
const RightSlot = Styles.RightSlot
const DangerousItem = Styles.DangerousItem
