import Header from '../Components/Header';

import LoginPage from "../Components/UserForm/LoginPage";
import RegisterPage from '../Components/UserForm/RegisterPage';
import WordStateOnline from "./WordState/OnlineController";
import WordStateOffline from "./WordState/OfflineController";
import HomePage from './HomePage';
import UserPage from './UserPage';
import { LoggedUsernameContext } from "../LoggedUsernameContext"

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useState } from "react";


const Layout = ({children}: {children: JSX.Element}) => {
  const updateUsername = (username: string) => setLoggedUsername({username: username, updateUsername: updateUsername});
  const [loggedUsername, setLoggedUsername] = useState({username: "", updateUsername: updateUsername});

  return (
    <>
    <LoggedUsernameContext.Provider value={loggedUsername}>
      <Header />
      {children}
    </LoggedUsernameContext.Provider>
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
        <ProtectedContent>
          <WordStateOnline />
        </ProtectedContent>
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
  {
    path: "/offline",
    element: (
      <Layout>
        <WordStateOffline />
      </Layout>
    ),
  },
]);

const ModuleRouter = () => {
  return <RouterProvider router={router} />
}

// TODO: WordStateContoller zależny od stanu logowania użytkownika

export default ModuleRouter