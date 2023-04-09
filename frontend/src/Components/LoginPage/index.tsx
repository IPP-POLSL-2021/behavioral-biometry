import { useNavigate } from "react-router";
import styles from "./style.module.scss";
import { FormEvent, useState } from "react";

type Idata = {
  username: string,
  password: string,
}

function Form({title, onSubmit, data, setData, btnText}: {title: string, onSubmit: (e: FormEvent) => void, data: Idata, setData: (_: Idata) => void, btnText: string}) {
  return (
    <div className={styles.form}>
      <div className={styles.title}>{title}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.username}
          value={data.username}
          onChange={(e) => setData({
            ...data,
            username: e.target.value
          })}
          name="username"
          placeholder="login"
          required
        />
        <input
          type="password"
          className={styles.password}
          value={data.password}
          onChange={(e) => setData({
            ...data,
            password: e.target.value
          })}
          name="password"
          placeholder="password"
          required
        />
        <div className={styles.button_container}>
          <input type="submit" className={styles.button} value={btnText} />
        </div>
      </form>
    </div>
  );
}

function LoginPage({setCookie}: {setCookie: any}) {
  const [loginData, setLoginData] = useState({username: "", password: ""});
  const [registerData, setRegisterData] = useState({username: "", password: ""});
  const navigate = useNavigate();

  const getRequest = (url: string, headers: any) => {
    fetch(url, {
      method: "GET",
      headers: headers
    })
    .then(res => res.json()
    .then(data => {
      console.log(data);
      setLoginData({
        username: "",
        password: "",
      });
      navigate("/");
    }))
    .catch(err => console.error(err));
  }

  const login = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5050/api/users/auth", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
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

  const register = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:5050/api/users", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
    .then(res => {
      setRegisterData({
        username: "",
        password: "",
      });
      if (!res.ok) return Promise.reject(res);
      console.log("Rejestracja sie powiodla");
    })
    .catch(err => {
      console.error(`Rejestracja nie powiodla sie, code: ${err.status}`);
    });
  }

  return (
    <div className={styles.main}>
      <Form title="register" onSubmit={register} data={registerData} setData={setRegisterData} btnText="Sign Up" />
      <Form title="login" onSubmit={login} data={loginData} setData={setLoginData} btnText="Sign in" />
    </div>
  )
}

export default LoginPage