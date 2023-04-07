import { useNavigate } from 'react-router-dom'

import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <a
        onClick={() => {
          navigate('/user')
        }}
      >
        <img src={loginLogo} alt="login" />
      </a>
    </header>
  );
}
