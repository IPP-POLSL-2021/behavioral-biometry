import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import UserForm from ".";

import styles from "./style.module.scss";
import { Status } from "./types";
import { CookieSetOptions } from "universal-cookie";

function LoginPage({
  setCookie,
}: {
  setCookie: (
    name: "access_token" | "username",
    value: string,
    options?: CookieSetOptions | undefined,
  ) => void;
}) {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState<Status>("typing");
  const navigate = useNavigate();

  const login = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    fetch("http://localhost:5050/api/users/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(res);
      })
      .then((token) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + 15 * 60 * 1000);
        setCookie("access_token", token, { path: "/", expires });
        setCookie("username", loginData.username, { path: "/", expires });
        navigate("/user");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  let infoDiv = null;
  if (status === "submitting") {
    infoDiv = <div>Logging in...</div>;
  } else if (status === "error") {
    infoDiv = <div>Error occured</div>;
  }

  return (
    <div className={styles.main}>
      {infoDiv}
      <UserForm
        title="login"
        onSubmit={login}
        data={loginData}
        setData={setLoginData}
        btnText="Sign in"
        status={status}
      />
      <span style={{ textAlign: "center", marginTop: "1rem" }}>
        Don&apos;t have account yet?
        <a onClick={redirectToRegister}>
          <br />
          sign up here
        </a>
      </span>
    </div>
  );
}

export default LoginPage;
