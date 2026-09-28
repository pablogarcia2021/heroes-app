/* eslint-disable react-refresh/only-export-components */
import {  createHashRouter, Navigate } from "react-router";
import { lazy } from "react";
import { HomePage } from "../heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";

import { AdminLayouts } from "@/admin/layouts/AdminLayouts";

import { HeroesLayouts } from "@/heroes/layouts/HeroesLayouts";

//crear lazy load o carga perezosa
const SearchPage = lazy(() => import("@/heroes/pages/seach/SearchPage"));
const AdminPage = lazy(() => import("@/admin/pages/AdminPage"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <HeroesLayouts />,
    children: [
      {
        //cuando es la primera ruta hija en vez del path ponemos index y no utilizan /
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:idSlug",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayouts />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
