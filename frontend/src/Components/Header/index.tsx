import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";
import { useCookies } from "react-cookie";

export default function Header() {
  const navigate = useNavigate();
  const [{ username }] = useCookies(["username"]);

  return (
    <header className={styles.header}>
      <a
        onClick={() => {
          navigate("/");
        }}
      >
        Home page
      </a>
      <div className={styles.login}>
        {username && <span>Logged as {username}</span>}
        <a
          onClick={() => {
            navigate("/user");
          }}
        >
          <img src={loginLogo} alt="login" />
        </a>
      </div>
    </header>
  );
}
