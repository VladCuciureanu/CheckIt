import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import styled from "styled-components"

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
    color: hsla(var(--colors-lowContrast), 0.5);
    transition: color 0.3s ease;
  }
  &:hover {
    background-color: hsla(var(--colors-lowContrast), 0.15);
    svg {
      color: hsl(var(--colors-highContrast));
    }
  }
`

const Content = styled(DropdownMenu.Content)`
  min-width: 220;
  background-color: hsl(var(--colors-bg));
  border: 1px solid hsla(var(--colors-lowContrast), 0.5);
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
    background-color: hsla(var(--colors-lowContrast), 0.175);
  }
`

const DangerousItem = styled(Item)`
  color: hsl(var(--colors-red-9));
`

const RightSlot = styled.div`
  margin-left: "auto";
  padding: 0.2rem 0.35rem;
  border-radius: 0.3rem;
  margin-top: -3px;
  margin-bottom: -3px;
  background-color: hsla(var(--colors-lowContrast), 0.21);
  color: hsla(var(--colors-lowContrast), 0.8);
  [data-highlighted] > & {
    color: "white";
  }
  [data-disabled] & {
    color: blue;
  }
`

const Styles = { Trigger, Content, Item, DangerousItem, RightSlot }

export default Styles
