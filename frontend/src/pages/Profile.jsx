import React from "react";
import ProfileModule from "../modules/Profile";

function Profile() {
  const entity = "profile";

  const labels = {
    PANEL_TITLE: "Profile",
    ENTITY_NAME: "PROFILE",
  };

  const config = {
    entity,
    ...labels,
  };

  console.log(config);

  return <ProfileModule config={config} />;
}

export default Profile;
