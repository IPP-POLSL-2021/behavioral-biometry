import { useCookies } from "react-cookie";
import { useContext } from "react";

import { LoggedUsernameContext } from "../../LoggedUsernameContext";

const UserPage = () => {
  const [, , removeCokie] = useCookies(["access_token"]);
  const loggedUsername = useContext(LoggedUsernameContext);
  const logout = () => {
    removeCokie("access_token", {path: '/'})
    loggedUsername.updateUsername("");
  }
  return (
    <div>
      <a onClick={logout}>log out</a>
    </div>
  )
}

export default UserPage;