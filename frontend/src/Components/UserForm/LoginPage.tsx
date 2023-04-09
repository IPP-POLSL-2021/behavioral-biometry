import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from '.';

import styles from './style.module.scss'

function LoginPage({setCookie}: {setCookie: any}) {
  const [loginData, setLoginData] = useState({username: "", password: ""});
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

  const redirectToRegister = () => {
    navigate('/register')
  }

  return (
    <div className={styles.main}>
      <UserForm title="login" onSubmit={login} data={loginData} setData={setLoginData} btnText="Sign in" />
      <span
        style={{textAlign: 'center', marginTop: '1rem'}}
      >Don't have account yet? <a onClick={redirectToRegister}><br/>sign up here</a></span>
    </div>
  )
}

export default LoginPage;