import { useCookies } from "react-cookie";
import { useState, useContext } from "react";

import { LoggedUsernameContext } from "../../LoggedUsernameContext";
import OnlineController from "../../Components/WordState/OnlineController";

const UserPage = () => {
  const [, , removeCokie] = useCookies(["access_token"]);
  const [ isStarted, setStarted ] = useState(false);
  const loggedUsername = useContext(LoggedUsernameContext);
  const logout = () => {
    removeCokie("access_token", {path: '/'})
    loggedUsername.updateUsername("");
  }
  return (
    <div>
      {isStarted ? (
        <>
          <OnlineController apiUrl='http://localhost:5050/api/prompt'/>
        </>
      ) : (
        <button onClick={() => setStarted(true)}>Create keystrokes profile</button>
      )}
      <a onClick={logout}>log out</a>
    </div>
  )
}

export default UserPage;