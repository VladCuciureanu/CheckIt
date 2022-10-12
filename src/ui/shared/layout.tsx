import { ReactNode } from "react"
import styled from "styled-components"

export default function Layout({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>
}

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0px 32px;
  min-height: calc(100vh - 100px);
  position: relative;
`
