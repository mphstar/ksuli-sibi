import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Kamus from "./pages/Kamus";

const Home = lazy(() => import("@/pages/Home"));

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/kamus"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Kamus />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
