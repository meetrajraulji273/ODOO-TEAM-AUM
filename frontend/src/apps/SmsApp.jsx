import React from "react";
import { Layout } from "antd";
import { useAppContext } from "../context/appContext";
import Navigation from "./Navigation/NavigationContainer";
import useResponsive from "../hooks/useResponsive";
import HeaderContent from "./Header/HeaderContainer";
import AppRouter from "../router/AppRouter";

function SmsApp() {
  const { Content } = Layout;

  const { state, appContextAction } = useAppContext();
  console.log("state", state);
  console.log("appContextAction", appContextAction);

  const { isMobile } = useResponsive();

  return (
    <Layout hasSider style={{ flexDirection: "row" }}>
      {isMobile ? (
        <Layout style={{ marginLeft: 0 }}>
          <HeaderContent/>
          <Content
            style={{
              margin: "40px auto 30px",
              overflow: "initial",
              width: "100%",
              padding: "0 25px",
              maxWidth: "none",
            }} 
          >
            <AppRouter />
            <div>hi</div>
          </Content>
        </Layout>
      ) : (
        <Layout>
          <HeaderContent/>
          <Content
            style={{
              margin: "40px auto 30px",
              overflow: "initial",
              width: "100%",
              padding: "0 50px",
              maxWidth: 1400,
            }}
          >
            <AppRouter />
            <div>hi</div>
          </Content>
        </Layout>
      )}
    </Layout>
  );
}

export default SmsApp;
