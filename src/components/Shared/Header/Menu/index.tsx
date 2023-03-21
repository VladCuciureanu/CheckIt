"use client";
import styles from "./index.module.scss";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import HamburgerIcon from "@/assets/icons/Hamburger";
import XIcon from "@/assets/icons/X";

export default function HeaderMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <DropdownMenu.Root onOpenChange={(value) => setMenuOpen(value)}>
      <DropdownMenu.Trigger asChild>
        <button className={styles.Trigger}>
          {menuOpen ? <XIcon /> : <HamburgerIcon />}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.Container} align="end">
          <DropdownMenu.Item className={styles.Item}>
            Toggle Blur <div className={styles.RightSlot}>⌘+B</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item}>
            Toggle Theme <div className={styles.RightSlot}>⌘+T</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.Item}>
            Export <div className={styles.RightSlot}>⌘+S</div>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.DangerousItem}>
            Clear Board <div className={styles.RightSlot}>⌘+T</div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
