import * as BaseDropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../index.module.scss";
import { ComponentProps } from "react";

function Content(props: BaseDropdownMenu.MenuContentProps) {
  const className = `${props.className} ${styles.Container}`;
  const styledProps = { ...props, className };
  return (
    <BaseDropdownMenu.Content {...styledProps}>
      {styledProps.children}
    </BaseDropdownMenu.Content>
  );
}

function Item(props: BaseDropdownMenu.MenuItemProps) {
  const className = `${props.className} ${styles.Item}`;
  const styledProps = { ...props, className };
  return (
    <BaseDropdownMenu.Item {...styledProps}>
      {styledProps.children}
    </BaseDropdownMenu.Item>
  );
}

function DangerousItem(props: BaseDropdownMenu.MenuItemProps) {
  const className = `${props.className} ${styles.DangerousItem}`;
  const styledProps = { ...props, className };
  return (
    <BaseDropdownMenu.Item {...styledProps}>
      {styledProps.children}
    </BaseDropdownMenu.Item>
  );
}

function RightSlot(props: ComponentProps<"div">) {
  return (
    <div {...props} className={styles.RightSlot}>
      {props.children}
    </div>
  );
}

const DropdownMenu = {
  ...BaseDropdownMenu,
  Content,
  Item,
  DangerousItem,
  RightSlot,
};

export default DropdownMenu;
