import { useCookies } from "react-cookie";
import { useState } from "react";

import OnlineController from "../../Components/WordState/OnlineController";
import { Itoken } from "../../Components/WordState/interfaces";
import { convertPayload } from "../../Components/WordState/helpers";
import styles from "./style.module.scss";

const UserPage = () => {
  const [{ access_token }] = useCookies(["access_token", "username"]);

  const [isStarted, setStarted] = useState(false);
  const getApiUrl = "http://localhost:5050/api/prompt/authenticationProfile";

  const onFinished = (letters: Itoken[]) => {
    const payload = convertPayload(letters);
    fetch(getApiUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: access_token,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      {isStarted ? (
        <div className={styles.mainCont}>
          <OnlineController
            restartOnCompleted
            continueAfter
            apiUrl={getApiUrl}
            onFinished={onFinished}
            classNames={styles.main}
          />
        </div>
      ) : (
        <div className={styles.main1}>
          <div onClick={() => setStarted(true)}>Create keystrokes profile</div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default UserPage;
