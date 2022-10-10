import { ChangeEventHandler, FormEventHandler } from "react"
import styled from "styled-components"

type InputBoxProps = {
  value?: string | number | readonly string[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSubmit?: FormEventHandler<HTMLFormElement>
}

export default function TodoInputBox(props: InputBoxProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <StyledInput
        type="text"
        placeholder="What are you thinking of?"
        value={props.value}
        onChange={props.onChange}
      />
    </form>
  )
}

const StyledInput = styled.input`
  border: 0;
  border-radius: var(--radii-2);
  width: 100%;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
  font-weight: 300;
  background: transparent;
  transition: all 0.5s ease;
  margin-left: -1.25rem;
  margin-bottom: 2rem;

  ::placeholder {
    color: rgb(var(--colors-gray-8));
    transition: color 0.5s ease;
  }

  &:hover {
    background: rgb(var(--colors-gray-4));
    ::placeholder {
      color: rgb(var(--colors-gray-10));
    }
  }

  :focus {
    outline: none;
  }
`
