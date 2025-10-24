import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import ProtectedRoute from "./ProtectedRoute";
import PagesHub from "../others/PagesHub";

// Lazy-loaded pages
const Hero = lazy(() => import("../hero/Hero"));
const Signin = lazy(() => import("../register/Signin"));
const Signup = lazy(() => import("../register/Signup"));
const Core = lazy(() => import("../core/Core"));
const Profile = lazy(() => import("../profile/Profile"));
const PageNotFound = lazy(() => import("../others/PageNotFound"));
const StackVisualizer = lazy(() => import("../stack/StackVisualizer"));

const withSuspense = (component) => (
  <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
    {component}
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<Layout />),
    children: [
      { index: true, element: withSuspense(<Hero />) },
      { path: "signin", element: withSuspense(<Signin />) },
      { path: "signup", element: withSuspense(<Signup />) },
      { path: "pagehub", element: withSuspense(<PagesHub />) },
      {
        path: "core",
        element: <ProtectedRoute>{withSuspense(<Core />)}</ProtectedRoute>,
      },
      {
        path: "profile",
        element: <ProtectedRoute>{withSuspense(<Profile />)}</ProtectedRoute>,
      },
      {
        path: "stack",
        element: (
          <ProtectedRoute>{withSuspense(<StackVisualizer />)}</ProtectedRoute>
        ),
      },
      { path: "*", element: withSuspense(<PageNotFound />) },
    ],
  },
]);
