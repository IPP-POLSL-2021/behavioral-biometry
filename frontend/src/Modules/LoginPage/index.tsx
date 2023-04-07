import styles from "./style.module.scss";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <div className={styles.title}>login</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            placeholder="login"
            required
          />
          <input
            type="password"
            className={styles.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="password"
            required
          />
          <div className={styles.button_container}>
            <input type="submit" className={styles.button} value="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
}
