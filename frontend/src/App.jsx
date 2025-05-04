import React from "react";
// import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { store } from "./Redux/store";
// import SportsMs from "./apps/SportsMs";
import "./index.css";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";

const SportsMs = lazy(() => import("./apps/SportsMs"));

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <SportsMs />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
