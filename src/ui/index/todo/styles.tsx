import {
  ContextMenuItem,
  ContextMenuContent,
} from "@radix-ui/react-context-menu"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0;
  border-radius: 0.5rem;
  user-select: none;
  transition: filter 1s ease;

  &.checked {
    p {
      color: hsla(var(--colors-lowContrast), 0.5);
      text-decoration-color: hsla(var(--colors-lowContrast), 0.5);
    }
    &.blurring {
      :not(&:hover) {
        filter: blur(3px);
      }
    }
  }
`

const Label = styled.p`
  transition: color 0.3s ease;
  display: inline-block;
  position: relative;
  font-weight: 400;
  text-decoration: line-through;
  text-decoration-color: transparent;
  transition: text-decoration-color 0.3s ease;
`

const StyledContextMenuContent = styled(ContextMenuContent)`
  min-width: 220;
  background-color: hsl(var(--colors-bg));
  border: 1px solid hsla(var(--colors-lowContrast), 0.5);
  border-radius: 0.75rem;
  padding: 0.35rem;
`

const StyledContextMenuItem = styled(ContextMenuItem)`
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
  padding: 0.55rem;
  font-size: 0.8rem;
  border-radius: 0.4rem;
  &:hover {
    background-color: hsla(var(--colors-lowContrast), 0.175);
    cursor: pointer;
  }
`

const DeleteContextMenuItem = styled(StyledContextMenuItem)`
  color: hsl(var(--colors-red-9));
  & svg {
    width: 16px;
    height: 16px;
    margin: -2px;
    stroke: hsl(var(--colors-red-9));
  }
`

const Styles = {
  StyledContextMenuContent,
  DeleteContextMenuItem,
  Label,
  Container,
}

export default Styles
