import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/Error";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import MainLayout from "./components/Layouts/MainLayout/MainLayout";
import App from "./App";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard/",
        element: <App />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);
