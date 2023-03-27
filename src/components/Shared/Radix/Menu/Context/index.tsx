import * as BaseContextMenu from "@radix-ui/react-context-menu";
import styles from "../index.module.scss";
import { ComponentProps } from "react";

function Content(props: BaseContextMenu.MenuContentProps) {
  const className = `${props.className} ${styles.Container}`;
  const styledProps = { ...props, className };
  return (
    <BaseContextMenu.Content {...styledProps}>
      {styledProps.children}
    </BaseContextMenu.Content>
  );
}

function SubContent(props: BaseContextMenu.MenuSubContentProps) {
  const className = `${props.className} ${styles.Container}`;
  const styledProps = { ...props, className };
  return (
    <BaseContextMenu.SubContent {...styledProps}>
      {styledProps.children}
    </BaseContextMenu.SubContent>
  );
}

function Item(props: BaseContextMenu.MenuItemProps) {
  const className = `${props.className} ${styles.Item}`;
  const styledProps = { ...props, className };
  return (
    <BaseContextMenu.Item {...styledProps}>
      {styledProps.children}
    </BaseContextMenu.Item>
  );
}

function DangerousItem(props: BaseContextMenu.MenuItemProps) {
  const className = `${props.className} ${styles.DangerousItem}`;
  const styledProps = { ...props, className };
  return (
    <BaseContextMenu.Item {...styledProps}>
      {styledProps.children}
    </BaseContextMenu.Item>
  );
}

function RightSlot(props: ComponentProps<"div">) {
  return (
    <div {...props} className={styles.RightSlot}>
      {props.children}
    </div>
  );
}

function SubTrigger(props: BaseContextMenu.MenuSubTriggerProps) {
  const className = `${props.className} ${styles.Item}`;
  const styledProps = { ...props, className };
  return (
    <BaseContextMenu.SubTrigger {...styledProps}>
      {styledProps.children}
    </BaseContextMenu.SubTrigger>
  );
}

const DropdownMenu = {
  ...BaseContextMenu,
  Content,
  SubContent,
  Item,
  DangerousItem,
  RightSlot,
  SubTrigger,
};

export default DropdownMenu;
