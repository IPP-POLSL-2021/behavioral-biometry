import { useCookies } from "react-cookie";
import { useState, useContext } from "react";

import { LoggedUsernameContext } from "../../LoggedUsernameContext";
import OnlineController from "../../Components/WordState/OnlineController";
import { Itoken } from "../../Components/WordState/interfaces";
import { convertPayload } from "../../Components/WordState/helpers";

const UserPage = () => {
  const [ { access_token }, , removeCokie ] = useCookies(["access_token"]);
  const [ isStarted, setStarted ] = useState(false);
  const loggedUsername = useContext(LoggedUsernameContext);
  const getApiUrl = "http://localhost:5050/api/prompt/authenticationProfile"

  const logout = () => {
    removeCokie("access_token", {path: '/'})
    loggedUsername.updateUsername("");
  }

  const onFinished = (letters: Itoken[]) => {
    const payload = convertPayload(letters)
    fetch(getApiUrl, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: access_token,
        'Content-Type': 'application/json'
      },
    })
  }

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
        <button onClick={() => setStarted(true)}>Create keystrokes profile</button>
      )}
      <a onClick={logout}>log out</a>
    </div>
  )
}

export default UserPage;