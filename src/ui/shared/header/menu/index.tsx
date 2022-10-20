import useStorage from "@/hooks/use-storage"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import styled from "styled-components"

export default function HeaderMenu() {
  const { theme, setTheme } = useTheme()
  const [_, setStorage] = useStorage()
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
          <Item onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle Theme <RightSlot>T</RightSlot>
          </Item>
          <DangerousItem
            onClick={() => {
              setStorage([])
              location.reload()
            }}
          >
            Clear Items
          </DangerousItem>
        </Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

const Trigger = styled(DropdownMenu.Trigger)`
  all: unset;
  min-height: 32px;
  min-width: 36px;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    max-width: 24px;
    color: rgba(var(--colors-lowContrast), 0.5);
    transition: color 0.3s ease;
  }
  &:hover {
    background-color: rgba(var(--colors-lowContrast), 0.15);
    svg {
      color: rgb(var(--colors-highContrast));
    }
  }
`

const Content = styled(DropdownMenu.Content)`
  min-width: 220;
  background-color: rgb(var(--colors-bg));
  border: 1px solid rgba(var(--colors-lowContrast), 0.5);
  border-radius: 0.75rem;
  padding: 0.35rem;
`

const Item = styled(DropdownMenu.Item)`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem;
  font-size: 0.8rem;
  border-radius: 0.4rem;
  &:hover {
    background-color: rgba(var(--colors-lowContrast), 0.175);
  }
`

const DangerousItem = styled(Item)`
  color: rgb(var(--colors-red-9));
`

const RightSlot = styled.div`
  margin-left: "auto";
  padding: 0.2rem 0.35rem;
  border-radius: 0.3rem;
  margin-top: -3px;
  margin-bottom: -3px;
  background-color: rgba(var(--colors-lowContrast), 0.21);
  color: rgba(var(--colors-lowContrast), 0.8);
  [data-highlighted] > & {
    color: "white";
  }
  [data-disabled] & {
    color: blue;
  }
`
