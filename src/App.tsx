import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import myRoute from "./routes/routes";
import MyLoading from "./components/organisms/MyLoading";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        {myRoute.map((route, index) => (
          <Route
            index={route.path == '/'}
            key={index}
            path={route.path}
            element={
              <Suspense fallback={<MyLoading />}>
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
