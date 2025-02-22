import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const  Kamus = lazy(() => import("@/pages/Kamus"));
const Kuis = lazy(() => import("@/pages/Kuis"));

const myRoute = [
    {
        "title": "Home",
        "path": "/",
        "component": Home,
    },
    {
        "title": "Kamus",
        "path": "/kamus",
        "component": Kamus
    },
    {
        "title": "Kuis",
        "path": "/kuis",
        "component": Kuis
    },

]

export default myRoute;