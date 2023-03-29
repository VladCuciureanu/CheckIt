import CheckItLogo from "@/assets/icons/Logo";
import Link from "next/link";
import styles from "./index.module.scss";

export default function HeaderLogo() {
  return (
    <Link aria-label={"Home Page"} href={"/"} className={styles.Link}>
      <CheckItLogo className={styles.Logo} />
    </Link>
  );
}
