import { lazy } from "react";

const myRoute = [
  {
    title: "Home",
    path: "/",
    component: lazy(() => import("@/pages/Home")),
  },
  {
    title: "Kamus",
    path: "/kamus",
    component: lazy(() => import("@/pages/Kamus")),
  },
  {
    title: "Kuis",
    path: "/kuis",
    component: lazy(() => import("@/pages/Kuis")),
  },
  {
    title: "Tebak Huruf",
    path: "/kuis/tebak-huruf",
    component: lazy(() => import("@/pages/Kuis/TebakHuruf/TebakHuruf")),
  },
  {
    title: "Start Quiz",
    path: "/kuis/tebak-huruf/app",
    component: lazy(() => import("@/pages/Kuis/TebakHuruf/Quiz")),
  },
  {
    title: "Menyusun Huruf",
    path: "/kuis/menyusun-huruf",
    component: lazy(() => import("@/pages/Kuis/MenyusunHuruf/MenyusunHuruf")),
  },
  {
    title: "Start Quiz",
    path: "/kuis/menyusun-huruf/app",
    component: lazy(() => import("@/pages/Kuis/MenyusunHuruf/Quiz")),
  },
];

export default myRoute;
