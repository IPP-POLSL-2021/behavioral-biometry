import styles from "./style.module.scss";
import { FormEvent } from "react";
import { Status, FormData } from "./types";

function UserForm({
  title,
  onSubmit,
  data,
  setData,
  btnText,
  status,
}: {
  title: string;
  onSubmit: (e: FormEvent) => void;
  data: FormData;
  setData: (_: FormData) => void;
  btnText: string;
  status: Status;
}) {
  return (
    <div className={styles.form}>
      <div className={styles.title}>{title}</div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className={styles.username}
          value={data.username}
          onChange={(e) =>
            setData({
              ...data,
              username: e.target.value,
            })
          }
          name="username"
          placeholder="login"
          required
        />
        <input
          type="password"
          className={styles.password}
          value={data.password}
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          name="password"
          placeholder="password"
          required
        />
        <div className={styles.button_container}>
          <input
            type="submit"
            className={styles.button}
            value={btnText}
            disabled={
              !data.username || !data.password || status === "submitting"
            }
          />
        </div>
      </form>
    </div>
  );
}

export default UserForm;
