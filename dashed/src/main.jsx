// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/routing/router.jsx";
import { AuthContextProvider } from "./components/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
  // </StrictMode>
);
