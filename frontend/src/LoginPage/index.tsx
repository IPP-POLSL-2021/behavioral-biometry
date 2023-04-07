import styles from "./style.module.scss";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  return cookies.access_token ? <LoggedIn removeCookie={removeCookie} /> : <LoginForm setCookie={setCookie} />
}

function LoggedIn({removeCookie}: {removeCookie: any}) {

  const logOut = () => {
      removeCookie("access_token", {path: "/"});
  }

  return (
    <div className={styles.main}>
      <div className={styles.loggedInMessage}>You are already logged in!</div>
      <button className={styles.button} onClick={logOut}>Log out</button>
    </div>
  )
}


function LoginForm({setCookie}: {setCookie: any}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
