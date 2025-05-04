import React, { lazy, Suspense, useState } from "react";
// import SmsApp from "./SmsApp";
import AuthRouter from "../router/AuthRouter";
import { useSelector } from "react-redux";
import { selectAuth } from "../Redux/Auth/selectors";

import PageLoader from "../components/PageLoader";
import Localization from "../locale/Localization";
import { AppContextProvider } from "../context/appContext";

const SmsApp = lazy(() => import("./SmsApp"));

const DefaultApp = () => {
  
  return (
    <Localization>
      <AppContextProvider>
        <Suspense fallback={<PageLoader />}>
          <SmsApp />
        </Suspense>
      </AppContextProvider>
    </Localization>
  );
};

function SportsMs() {
  const { isLoggedIn } = useSelector(selectAuth);
  console.log("isLoggedIn", isLoggedIn);

  if (!isLoggedIn) {
    return <AuthRouter />;
  } else {
    return <DefaultApp />;
  }
}

export default SportsMs;
