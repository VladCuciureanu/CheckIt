import styled from "styled-components"
import UnstyledLogo from "./graphics/logo"

export default function Header() {
  return (
    <Container>
      <Logo />
    </Container>
  )
}

const Container = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 32px;
  box-sizing: border-box;
`

const Logo = styled(UnstyledLogo)`
  & {
    fill: rgb(var(--colors-lowContrast));
  }
`
