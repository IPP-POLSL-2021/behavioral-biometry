import Header from '../Components/Header';

import LoginForm from "../Components/LoginPage";
import WordStateOnline from "./WordState/OnlineController";
import WordStateOffline from "./WordState/OfflineController";
import HomePage from './HomePage';
import UserPage from './UserPage';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Layout = ({children}: {children: JSX.Element}) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
const ProtectedContent = ({children}: {children: JSX.Element}) => {
  const [cookies, setCookie] = useCookies(["access_token"]);

  return cookies.access_token ? children : <LoginForm setCookie={setCookie} />
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