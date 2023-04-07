import Header from '../Components/Header';

import LoginForm from "./LoginPage";
import WordStateOnline from "./WordState/OnlineController";
import WordStateOffline from "./WordState/OfflineController";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Layout = ({children}: {children: JSX.Element}) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <WordStateOnline />
      </Layout>
    ),
  },
  {
    path: "/offline",
    element: (
      <Layout>
        <WordStateOffline />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  }
]);

const ModuleRouter = () => {
  return <RouterProvider router={router} />
}

// TODO: WordStateContoller zależny od stanu logowania użytkownika

export default ModuleRouter