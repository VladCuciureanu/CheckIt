import Link from "next/link"
import styled from "styled-components"
import UnstyledLogo from "../graphics/logo"
import Menu from "./menu"

export default function Header() {
  return (
    <Container>
      <Link href="/" passHref>
        <Anchor>
          <Logo />
        </Anchor>
      </Link>
      <Menu />
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

const Anchor = styled.a`
  width: 32px;
  height: 32px;
`

const Logo = styled(UnstyledLogo)`
  & {
    cursor: pointer;
    fill: rgba(var(--colors-lowContrast), 0.5);
    transition: fill 0.3s ease;
    :hover {
      fill: hsl(var(--colors-highContrast));
    }
  }
`
