import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';

import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";
import { LoggedUsernameContext } from "../../LoggedUsernameContext"


export default function Header() {
  const navigate = useNavigate();
  const loggedUsername = useContext(LoggedUsernameContext)

  return (
    <header className={styles.header}>
      <a onClick={() => { navigate("/") }}>Home page</a>
      <div className={styles.login}>
        {loggedUsername.username && <span>Logged as {loggedUsername.username}</span>}
        <a
          onClick={() => {
            navigate('/user')
          }}
        >
          <img src={loginLogo} alt="login" />
        </a>
      </div>
    </header>
  );
}
