import styles from "./style.module.scss";
import { FormEvent, useState } from "react";

import UserForm from ".";
import { Status } from "./types";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState<Status>("typing");
  const navigate = useNavigate();

  const register = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    fetch("http://srv11.mikr.us:30210/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        if (!res.ok) return Promise.reject(res);
        navigate("/user");
      })
      .catch((err) => {
        console.error(`Rejestracja nie powiodla sie, code: ${err.status}`);
        setStatus("error");
      });
  };

  let infoDiv = null;
  if (status === "submitting") {
    infoDiv = <div>Creating your account...</div>;
  } else if (status === "error") {
    infoDiv = <div>Error occured</div>;
  }

  return (
    <div className={styles.main}>
      {infoDiv}
      <UserForm
        title="register"
        onSubmit={register}
        data={registerData}
        setData={setRegisterData}
        btnText="Sign Up"
        status={status}
      />
    </div>
  );
}

export default RegisterPage;
