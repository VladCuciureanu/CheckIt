import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

export default function HeaderLogo() {
  return (
    <Link aria-label={"Home Page"} href={"/"} className={styles.Link}>
      <div className={styles.Logo} />
    </Link>
  );
}
