import { debounce } from "lodash";
import { useMemo, useEffect } from "react";
import styles from "./index.module.scss";

type TodoInputProps = {
  value: string;
  onChange: (value: string) => any;
};

export default function TodoInput({ value, onChange }: TodoInputProps) {
  const debouncedContentSetter = useMemo(
    () =>
      debounce((value: string) => {
        onChange(value);
      }, 1000),
    [onChange]
  );

  useEffect(() => {
    return () => {
      debouncedContentSetter.cancel();
    };
  }, [debouncedContentSetter]);

  return (
    <p
      className={styles.Label}
      spellCheck={false}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.target.textContent ?? "")}
      onInput={(e) =>
        debouncedContentSetter(
          (e.target as EventTarget & HTMLParagraphElement).textContent ?? ""
        )
      }
    >
      {value}
    </p>
  );
}
