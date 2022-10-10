import styled from "styled-components"

export default function Squircle() {
  return (
    <Svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        d="
  M 0, 75
  C 0, 12.000000000000002 12.000000000000002, 0 75, 0
  S 150, 12.000000000000002 150, 75
      138, 150 75, 150
      0, 138 0, 75
"
        fill="#F5F7FA"
        stroke="2px solid #F00"
      ></path>
    </Svg>
  )
}

const Svg = styled.svg`
  max-height: 1.5rem;
  max-width: 1.5rem;
`
