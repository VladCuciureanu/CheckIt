"use client";
import { ComponentProps, FormEventHandler, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Button from "@/components/Shared/Button";
import PlusCircleIcon from "@/assets/icons/PlusCircle";
import { useSettings } from "@/hooks/settings";

type InputFieldProps = Omit<ComponentProps<"input">, "onSubmit"> & {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isEmpty: boolean;
};

export default function InputField(props: InputFieldProps) {
  const { onSubmit, isEmpty, ...fieldProps } = props;
  const [focused, setFocused] = useState(false);
  const [clickThrough, setClickThrough] = useState(true);
  const settings = useSettings();

  const showButton = focused && !isEmpty;
  const shouldBlur = !focused && isEmpty && settings?.blurred;

  useEffect(() => {
    if (showButton) {
      setClickThrough(false);
    } else {
      setTimeout(() => {
        setClickThrough(true);
      }, 500);
    }
  }, [showButton]);

  return (
    <form
      className={styles.Form}
      onSubmit={onSubmit}
      style={shouldBlur ? { filter: "blur(.075rem)" } : undefined}
    >
      <input
        className={isEmpty ? styles.InputFieldEmpty : styles.InputField}
        placeholder={"What are you thinking?"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={showButton ? { width: "calc(100% - 3.125rem)" } : undefined}
        {...fieldProps}
      />
      <Button
        tabIndex={showButton ? undefined : -1}
        className={showButton ? styles.Button : styles.InvisibleButton}
        style={clickThrough ? { pointerEvents: "none" } : undefined}
      >
        <PlusCircleIcon />
      </Button>
    </form>
  );
}
