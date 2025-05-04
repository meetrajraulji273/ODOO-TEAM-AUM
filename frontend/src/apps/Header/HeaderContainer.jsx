import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../Redux/Auth/selectors";
import { useNavigate } from "react-router";
import { FILE_BASE_URL } from "../../config/serverApiconfig";
import { Avatar, Dropdown, Layout } from "antd";
import { LogoutOutlined, ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function HeaderContent() {
  const currentAdmin = useSelector(selectCurrentAdmin);

  const { Header } = Layout;

  const ProfileDropdown = () => {
    const navigate = useNavigate();
    return (
      <div className="profileDropdown" onClick={() => navigate("/profile")}>
        <Avatar
          size="large"
          className="last"
          src={
            currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : undefined
          }
          style={{
            color: "#fff",
            backgroundColor: currentAdmin?.photo ? "none" : "#d0d5d9",
            boxShadow: "rgba(150, 190, 238, 0.35) 0px 0px 6px 1px",
          }}
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {currentAdmin?.name} {currentAdmin?.surname}
          </p>
          <p>{currentAdmin?.email}</p>
        </div>
      </div>
    );
  };

  const items = [
    {
      label: <ProfileDropdown style={{ color: "#eaeaea" }}/>,
      key: "ProfileDropdown",
    },
    {
      type: "divider",
    },
    {
      icon: <UserOutlined style={{ color: "#eaeaea" }}/>,
      key: "settingProfile",
      label: (
        <Link
          to={"/profile"}
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            color: "#eaeaea",
          }}
        >
          Profile Settings
        </Link>
      ),
    },
    {
      icon: <ToolOutlined style={{ color: "#eaeaea" }}/>,
      key: "settingApp",
      label: (
        <Link
          to={"/settings"}
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            color: "#eaeaea",
          }}
        >
          Settings
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      icon: <LogoutOutlined style={{ color: "#eaeaea" }} />,
      key: "logout",
      label: (
        <Link
          to={"/logout"}
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            color: "#eaeaea",
          }}
        >
          Logout
        </Link>
      ),
    },
  ];

  return (
    <Header
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        gap: "15px",
        marginLeft: "-50px",
      }}
    >
      <Dropdown
        menu={{
          items,
          style: {
            backgroundColor: "#5a57ff ", // <-- THIS works on the menu
            borderRadius: "8px",
            padding: "8px",
          },
        }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Avatar
          className="last"
          src={
            currentAdmin?.photo
              ? FILE_BASE_URL + currentAdmin?.photo
              : undefined
          }
          style={{
            color: "#fff",
            backgroundColor: currentAdmin?.photo ? "none" : "#d0d5d9",
            boxShadow: "rgba(150, 190, 238, 0.35) 0px 0px 10px 2px",
            float: "right",
            cursor: "pointer",
          }}
          size="large"
        >
          {currentAdmin?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
      </Dropdown>
    </Header>
  );
}

export default HeaderContent;
