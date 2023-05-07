import Header from '../Components/Header';

import LoginPage from "../Components/UserForm/LoginPage";
import RegisterPage from '../Components/UserForm/RegisterPage';
import WordState from "../Modules/WordState";
import HomePage from './HomePage';
import UserPage from './UserPage';
import { LoggedUsernameContext } from "../LoggedUsernameContext"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from "react";


const Layout = ({children}: {children: JSX.Element}) => {
  const loggedUsername = useContext(LoggedUsernameContext)
  const [cookies, ] = useCookies(["access_token"]);

  useEffect(() => {
    if (cookies.access_token) {
      fetch("http://localhost:5050/api/users/current", {
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: cookies.access_token
        }
      })
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => loggedUsername.updateUsername(data.userName))
      .catch((err) => console.error(err))
    }
  }, [])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
const ProtectedContent = ({children}: {children: JSX.Element}) => {
  const [cookies, setCookie] = useCookies(["access_token"]);

  return cookies.access_token ? children : <LoginPage setCookie={setCookie} />
}

const router = createBrowserRouter([
  {
    path: "/wordstate",
    element: (
      <Layout>
        <WordState />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    )
  },
  {
    path: "/register",
    element: (
			<Layout>
				<RegisterPage />
			</Layout>
    )
  },
  {
    path: "/user",
    element: (
      <Layout>
        <ProtectedContent>
          <UserPage />
        </ProtectedContent>
      </Layout>
    )
  },
]);

const ModuleRouter = () => {
  const updateUsername = (username: string) => setLoggedUsername({username: username, updateUsername: updateUsername});
  const [loggedUsername, setLoggedUsername] = useState({username: "", updateUsername: updateUsername});

  return (
    <LoggedUsernameContext.Provider value={loggedUsername}>
      <RouterProvider router={router} />
    </LoggedUsernameContext.Provider>
  );
}

// TODO: WordStateContoller zależny od stanu logowania użytkownika

export default ModuleRouter