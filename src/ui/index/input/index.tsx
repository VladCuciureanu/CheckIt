import StorageService from "@/libs/storage"
import { FormEvent, useState } from "react"
import styled from "styled-components"

export default function TodoInputBox() {
  const [newLabel, setNewLabel] = useState<string>("")
  const handleInput = (event: FormEvent) => {
    event.preventDefault()
    if (newLabel.length < 1) {
      return
    }
    StorageService.addItem({ label: newLabel, checked: false })
    window.dispatchEvent(new Event("storage"))
    setNewLabel("")
  }

  return (
    <form onSubmit={(event) => handleInput(event)}>
      <StyledInput
        type="text"
        placeholder="What are you thinking of?"
        value={newLabel}
        onChange={(event) => setNewLabel(event.target.value)}
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
