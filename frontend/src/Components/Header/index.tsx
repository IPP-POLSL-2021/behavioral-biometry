import { useNavigate } from "react-router-dom";

import styles from "./style.module.scss";
import loginLogo from "./loginLogo.svg";
import { useCookies } from "react-cookie";

export default function Header() {
  const [, , removeCookie] = useCookies([
    "access_token",
    "username",
  ]);
  const navigate = useNavigate();
  const [{ username }] = useCookies(["username"]);
  const logout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("username", { path: "/" });
  };
  return (
    <header className={styles.header}>
      <a
        onClick={() => {
          navigate("/");
        }}
        className={styles.pointy}
      >
        Home page
      </a>
      <div className={styles.login}>
          {username && <span>Logged as {username} <a onClick={logout} className={styles.pointy}>log out</a></span>}
          <a
          onClick={() => {
            navigate("/user");
          }}
          className={styles.pointy}
          >
          <img src={loginLogo} alt="login" />
        </a>
      </div>
    </header>
  );
}
