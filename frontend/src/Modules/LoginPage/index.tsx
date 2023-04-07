import { useNavigate } from "react-router";
import styles from "./style.module.scss";
import { FormEvent, useState } from "react";

function LoginForm({setCookie}: {setCookie: any}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getRequest = (url: string, headers: any) => {
    fetch(url, {
      method: "GET",
      headers: headers
    })
    .then(res => res.json()
    .then(data => {
      console.log(data);
      setUsername("");
      setPassword("");
      navigate("/");
    }))
    .catch(err => console.error(err));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5050/api/users/auth", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password})
    })
    .then(res => {
      return res.ok ? res.json() : Promise.reject(res);
    })
    .then(token => {
      getRequest("http://localhost:5050/api/users/current", {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      });
      let expires = new Date();
      expires.setTime(expires.getTime() + (15 * 60 * 1000))
      setCookie("access_token", token, { path: "/", expires})
    })
    .catch(err => {
      console.error(err);
    });
      
  }

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

export default LoginForm