import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import myRoute from "./routes/routes";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        {myRoute.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <route.component />
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
