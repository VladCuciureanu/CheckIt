import { ComponentProps, LegacyRef, forwardRef } from "react";
import styles from "./index.module.scss";

type ButtonProps = ComponentProps<"button">;

const Button = forwardRef(
  (props: ButtonProps, ref: LegacyRef<HTMLButtonElement> | undefined) => {
    return (
      <button
        {...props}
        ref={ref}
        className={`${styles.Button} ${props.className}`}
      >
        {props.children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
