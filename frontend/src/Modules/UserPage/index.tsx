import { useCookies } from "react-cookie";
import { useState } from "react";

import OnlineController from "../../Components/WordState/OnlineController";
import { Itoken } from "../../Components/WordState/interfaces";
import { convertPayload } from "../../Components/WordState/helpers";

const UserPage = () => {
  const [{ access_token }, , removeCookie] = useCookies([
    "access_token",
    "username",
  ]);
  const [isStarted, setStarted] = useState(false);
  const getApiUrl = "http://srv11.mikr.us:30210/api/prompt/authenticationProfile";

  const logout = () => {
    removeCookie("access_token", { path: "/" });
    removeCookie("username", { path: "/" });
  };

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
        <>
          <OnlineController
            restartOnCompleted
            continueAfter
            apiUrl={getApiUrl}
            onFinished={onFinished}
          />
        </>
      ) : (
        <button onClick={() => setStarted(true)}>
          Create keystrokes profile
        </button>
      )}
      <a onClick={logout}>log out</a>
    </div>
  );
};

export default UserPage;
