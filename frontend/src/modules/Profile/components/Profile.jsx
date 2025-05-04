import React, { useEffect } from "react";
import { useProfileContext } from "../../../context/ProfileContext";
import AdminInfo from "./AdminInfo";

const Visibility = ({ isOpen, children }) => {
  const show = isOpen
    ? { display: "block", opacity: 1 }
    : { display: "none", opacity: 0 };
  return <div style={show}>{children}</div>;
};

function Profile({ config }) {
  const { state, profileContextSelector } = useProfileContext();
  const { read, update, passwordModal } = state;

  console.log(state);

  return (
    <div>
      <Visibility isOpen={read.isOpen}>
        <AdminInfo config={config} />
      </Visibility>
      <Visibility isOpen={update.isOpen}>UpdateInfo</Visibility>
      <Visibility isOpen={passwordModal.isOpen}>Password Modal</Visibility>
    </div>
  );
}

export default Profile;
