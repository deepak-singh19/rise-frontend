import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./components/routes/route";
import Root from "./components/routes/Root";
import { SocketProvider } from "./context/SocketProvider";
import UserContextProvider from "./context/UserContextProvider";

createRoot(document.getElementById("root")).render(
  <>
    <SocketProvider>
      <UserContextProvider>
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </UserContextProvider>
    </SocketProvider>
  </>,
);
