import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="./login">
        <img src={loginLogo} alt="login" />
      </a>
    </header>
  );
}
