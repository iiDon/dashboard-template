import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import MainLayout from "./components/Layouts/MainLayout/MainLayout";
import App from "./App";
import Example from "./pages/Example/page";
import Main from "./pages/dashboard/Main";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <Main />,
      },
      {
        path: "/dashboard/example/",
        element: <Example />,
      },
      {
        path: "dashboard/*",
        element: <Error />,
      },
    ],
  },

  {
    path: "/",
    element: <App />,
  },

  {
    path: "*",
    element: <Error />,
  },
]);
