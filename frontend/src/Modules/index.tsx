import Header from "../Components/Header";

import LoginPage from "../Components/UserForm/LoginPage";
import RegisterPage from "../Components/UserForm/RegisterPage";
import WordState from "../Modules/WordState";
import HomePage from "./HomePage";
import UserPage from "./UserPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useCookies } from "react-cookie";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
const ProtectedContent = ({ children }: { children: JSX.Element }) => {
  const [cookies, setCookie] = useCookies(["access_token", "username"]);

  return cookies.access_token ? children : <LoginPage setCookie={setCookie} />;
};

const router = createBrowserRouter([
  {
    path: "/wordstate",
    element: (
      <Layout>
        <ProtectedContent>
          <WordState />
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
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
  {
    path: "/user",
    element: (
      <Layout>
        <ProtectedContent>
          <UserPage />
        </ProtectedContent>
      </Layout>
    ),
  },
]);

const ModuleRouter = () => {
  return (
      <RouterProvider router={router} />
  )
};

export default ModuleRouter;
