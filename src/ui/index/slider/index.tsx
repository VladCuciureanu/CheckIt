import { useEffect, useState } from "react"
import styled, { CSSProperties } from "styled-components"

type SliderProps = {
  hoveredElement?: MouseEvent
}

export default function Slider({ hoveredElement }: SliderProps) {
  const [yPos, setYPos] = useState(0)
  const [height, setHeight] = useState(40)
  const [opacity, setOpacity] = useState(0)
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 })

  useEffect(() => {
    if (hoveredElement !== undefined) {
      setYPos(
        getContainer(
          hoveredElement.target as HTMLAreaElement,
        ).getBoundingClientRect().top - 100,
      )
      setHeight(
        getContainer(
          hoveredElement.target as HTMLAreaElement,
        ).getBoundingClientRect().height,
      )
      setOpacity(1)
    } else {
      setHeight(40)
      setOpacity(0)
    }
    setStyle({
      opacity: opacity,
      transform: `translateY(${yPos}px)`,
      height: height,
    })
  }, [height, hoveredElement, opacity, yPos])
  return <Component style={style} />
}

const Component = styled.div`
  opacity: 0;
  background-color: rgba(var(--colors-lowContrast), 0.2);
  position: absolute;
  border-radius: 0.5rem;
  max-height: 2.75rem;
  margin-top: 0.05rem;
  top: 0;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 0;
  z-index: -1;
  transition: all 0.05s ease;
`

const getContainer = (target: HTMLAreaElement): HTMLAreaElement => {
  if (target === null) return window.document.body as HTMLAreaElement
  if (["DIV", "FORM"].includes(target.tagName)) return target
  return getContainer(target.parentElement as HTMLAreaElement)
}
