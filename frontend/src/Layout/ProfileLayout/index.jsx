import { ProfileContextProvider } from "../../context/ProfileContext";

import React from "react";

const ProfileLayout = ({children}) => {
  return <ProfileContextProvider>{children}</ProfileContextProvider>;
};

export default ProfileLayout;
