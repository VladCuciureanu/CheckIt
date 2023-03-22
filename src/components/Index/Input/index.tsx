"use client";
import { ComponentProps, FormEventHandler, useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Shared/Button";
import PlusCircleIcon from "@/assets/icons/PlusCircle";

type InputFieldProps = Omit<ComponentProps<"input">, "onSubmit"> & {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isEmpty: boolean;
};

export default function InputField(props: InputFieldProps) {
  const { onSubmit, isEmpty, ...fieldProps } = props;
  const [focused, setFocused] = useState(false);
  const showButton = focused || !isEmpty;
  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      <input
        className={isEmpty ? styles.InputFieldEmpty : styles.InputField}
        placeholder={"What are you thinking at?"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={showButton ? { width: "calc(100% - 3.125rem)" } : undefined}
        {...fieldProps}
      />
      <Button
        tabIndex={showButton ? undefined : -1}
        className={styles.Button}
        style={
          showButton
            ? undefined
            : {
                transform: "translateX(200%)",
                opacity: 0,
                pointerEvents: "none",
              }
        }
      >
        <PlusCircleIcon />
      </Button>
    </form>
  );
}
