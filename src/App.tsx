import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

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
        <Route path="/kamus" element={<div>Kamus</div>} />
      </Route>
    </Routes>
  );
};

export default App;
