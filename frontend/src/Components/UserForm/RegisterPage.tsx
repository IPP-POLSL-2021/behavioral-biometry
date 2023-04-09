
import styles from "./style.module.scss";
import { FormEvent, useState } from "react";

import UserForm from ".";

function RegisterPage() {
  const [registerData, setRegisterData] = useState({username: "", password: ""});

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
      <UserForm title="register" onSubmit={register} data={registerData} setData={setRegisterData} btnText="Sign Up" />
    </div>
  )
}

export default RegisterPage