import Link from "next/link"
import styled from "styled-components"
import UnstyledLogo from "./graphics/logo"

export default function Header() {
  return (
    <Container>
      <Link href="/" passHref>
        <Anchor>
          <Logo />
        </Anchor>
      </Link>
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
  width: 36px;
  height: 36px;
`

const Logo = styled(UnstyledLogo)`
  & {
    cursor: pointer;
    fill: rgb(var(--colors-lowContrast));
    transition: fill 0.3s ease;
    :hover {
      fill: rgb(var(--colors-highContrast));
    }
  }
`
