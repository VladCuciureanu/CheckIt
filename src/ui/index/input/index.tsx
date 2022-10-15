import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react"
import styled from "styled-components"

type InputBoxProps = {
  value?: string | number | readonly string[]
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSubmit?: FormEventHandler<HTMLFormElement>
  onMouseEnter?: MouseEventHandler<HTMLFormElement>
  onMouseLeave?: MouseEventHandler<HTMLFormElement>
}

export default function TodoInputBox(props: InputBoxProps) {
  return (
    <form
      onSubmit={props.onSubmit}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
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
  font-family: var(--fonts-body);
  font-weight: 400;
  background: transparent;
  transition: all 0.5s ease;
  margin-left: -1.25rem;

  ::placeholder {
    color: rgba(var(--colors-lowContrast), 0.35);
    transition: color 0.5s ease;
    /* text-align: center; */
  }

  &:hover {
    ::placeholder {
      color: rgba(var(--colors-lowContrast), 0.6);
      text-align: left;
    }
  }

  :focus {
    outline: none;
  }
`
