import { Link } from 'react-router-dom'

import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to={"login"} replace>
        <img src={loginLogo} alt="login" />
      </Link>
    </header>
  );
}
