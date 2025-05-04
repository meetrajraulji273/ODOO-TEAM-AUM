import React from "react";
import ProfileLayout from "../../Layout/ProfileLayout";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Profile from "./components/Profile";

function ProfileModule({ config }) {
  return (
    <ProfileLayout>
      <Layout className="site-layout">
        <Content
          className="whiteBox shadow"
          style={{
            // padding: "50px 40px",
            margin: "100px auto",
            width: "100%",
            maxWidth: "1100px",
            // backgroundColor:"#dbd5d5",
          }}
        >
          <Profile config={config}/>
        </Content>
      </Layout>
    </ProfileLayout>
  );
}

export default ProfileModule;
