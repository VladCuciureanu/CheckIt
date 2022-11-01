import styled from "styled-components"

export default function TodoCheckbox({ checked }: { checked: boolean }) {
  return <Checkbox type="checkbox" checked={checked}></Checkbox>
}

const Checkbox = styled.input`
  &[type="checkbox"] {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
    background: transparent;
    border: 1px solid transparent;
    box-shadow: 0 0 0 1px hsla(var(--colors-lowContrast), 0.6);
    -webkit-appearance: none;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }
  &[type="checkbox"]:checked {
    border-color: hsla(var(--colors-bg));
    background-color: hsla(var(--colors-highContrast), 0.25);
  }
`
