import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingUp from "./components/SingUp";
import Home from "./components/Home";
import Login from "./components/Login";
import Market from './components/Market'
import Tim from './components/Tim'
import { store } from "./store/index";
import { Provider } from "react-redux";

const router = createBrowserRouter([
/*   {
    path: "/",
    element: <Home />,
  },
  {
    path: "/singUp",
    element: <SingUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Market",
    element: <Market />,
  }, */
  {
    path: "/",
    element: <Tim />,
  },
  {
    path: "/invitados",
    element: <Market />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
