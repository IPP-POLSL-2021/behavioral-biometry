import { useCookies } from "react-cookie";

const UserPage = () => {
  const [, , removeCokie] = useCookies(["access_token"]);
  const logout = () => {
    removeCokie("access_token", {path: '/'})
  }
  return (
    <div>
      <a onClick={logout}>log out</a>
    </div>
  )
}

export default UserPage;