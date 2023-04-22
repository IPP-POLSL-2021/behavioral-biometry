import { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from '.';
import { LoggedUsernameContext } from "../../LoggedUsernameContext"

import styles from './style.module.scss'
import { Status } from "./types"


function LoginPage({setCookie}: {setCookie: any}) {
  const [loginData, setLoginData] = useState({username: "", password: ""});
  const [status, setStatus] = useState<Status>("typing");
  const navigate = useNavigate();
  const loggedUsername = useContext(LoggedUsernameContext)

  const login = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting")
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
      let expires = new Date();
      expires.setTime(expires.getTime() + (15 * 60 * 1000))
      setCookie("access_token", token, { path: "/", expires})
      navigate("/");
      loggedUsername.updateUsername(loginData.username)
    })
    .catch(err => {
      console.error(err);
      setStatus("error");
    });
  }

  const redirectToRegister = () => {
    navigate('/register')
  }

  let infoDiv = null;
  if (status === "submitting") {
    infoDiv = <div>Logging in...</div>
  } else if (status === "error") {
    infoDiv = <div>Error occured</div>
  }

  return (
    <div className={styles.main}>
      {infoDiv}
      <UserForm title="login" onSubmit={login} data={loginData} setData={setLoginData} btnText="Sign in" status={status} />
      <span
        style={{textAlign: 'center', marginTop: '1rem'}}
      >Don't have account yet? <a onClick={redirectToRegister}><br/>sign up here</a></span>
    </div>
  )
}

export default LoginPage;