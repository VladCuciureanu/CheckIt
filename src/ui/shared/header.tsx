import styled from "styled-components"
import UnstyledLogo from "./logo"

export default function Header() {
  return (
    <Container>
      <Logo />
    </Container>
  )
}

const Container = styled.header`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 32px;
  box-sizing: border-box;
`

const Logo = styled(UnstyledLogo)`
  height: 32px;
  width: 32px;
  max-height: 32px;
  fill: rgb(var(--colors-lowContrast));
`
