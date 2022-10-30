import Squircle from "@/ui/shared/graphics/squircle"
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
    svg {
      opacity: 0.25;
      #fill {
        fill: hsl(var(--colors-lowContrast));
      }
      #outline {
        fill: hsl(var(--colors-lowContrast));
      }
    }
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

const Checkbox = styled(Squircle)`
  fill: hsl(var(--colors-highContrast));
  opacity: 0.8;
  max-width: 1.5rem;
  max-height: 1.5rem;
  min-width: 1.5rem;
  min-height: 1.5rem;
  margin-top: 0.05rem;
  #fill {
    fill: transparent;
  }
  transition: opacity 0.3s ease;
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

const DeleteContextMenuItem = styled(ContextMenuItem)`
  color: hsl(var(--colors-red-9));
  padding: 0.35rem;
  border: 0;
  border-radius: 0.25rem;
  box-sizing: border-box;
  background-color: hsla(var(--colors-lowContrast), 0.05);
  &:hover {
    background-color: hsla(var(--colors-highContrast), 0.15);
    cursor: pointer;
  }
  display: flex;
  gap: 0.25rem;
  align-items: center;
  & svg {
    width: 18px;
    stroke: hsl(var(--colors-red-9));
    stroke-width: 1.5px;
  }
`

const StyledContextMenuContent = styled(ContextMenuContent)`
  background-color: hsla(var(--colors-bg));
  border: 1px solid hsla(var(--colors-lowContrast), 0.5);
  padding: 0.4rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  z-index: 10;
`

const Styles = {
  StyledContextMenuContent,
  DeleteContextMenuItem,
  Checkbox,
  Label,
  Container,
}

export default Styles
