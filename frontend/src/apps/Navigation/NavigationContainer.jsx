import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { Drawer, Layout, Menu } from "antd";
import logoIcon from "../../assets/logo4.png";
import "../../index.css";
import logoText from "../../assets/logoText.png";
import { Button } from "antd";

import {
  DashboardOutlined,
  MenuOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export default function Navigation() {
  const { screenSize, isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();
  console.log("location", location.pathname);

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(!isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const navigate = useNavigate();

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "members",
      icon: <UserAddOutlined />,
      label: "Members",
      children: [
        {
          key: "athelets&Parents",
          label: <Link to="/athletes">Athletes & Parents</Link>,
        },
        {
          key: "staffmembers",
          label: <Link to="/staff">Staff Members</Link>,
        },
        {
          key: "officials",
          label: <Link to="/officials">Officials</Link>,
        },
        {
          key: "volunteers",
          label: <Link to="/volunteers">Volunteers</Link>,
        },
      ],
    },
    {
      key: "teams",
      icon: <TeamOutlined />,
      label: <Link to="/teams">Teams</Link>,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <SettingOutlined />,
      children: [
        {
          key: "generalSettings",
          label: <Link to={"/settings"}>Settings</Link>,
        },
        {
          key: "paymentMode",
          label: <Link to={"/payment/mode"}>Payments Mode</Link>,
        },
        {
          key: "taxes",
          label: <Link to={"/taxes"}>Taxes</Link>,
        },
        {
          key: "about",
          label: <Link to={"/about"}>About</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === "/") {
          setCurrentPath("dashboard");
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(!isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(!isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);

  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#5a57ff",
        width: "256px",
        borderRadius: "0px 48px 48px 0px",
      }}
    >
      <Sider 
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        width={256}
        className="navigation"
        style={{
          overflow: "auto",
          height: "100vh",
          direction: "ltr",
          position: isMobile ? "absolute" : "relative",
          bottom: "20px",
          ...(isMobile && {
            backgroundColor: "#5a57ff",
            borderRadius: "0px 48px 48px 0px",
          }),
        }}
        theme={"light"}
      >
        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
          }}
        >
          <img src={logoIcon} alt="Logo" style={{ marginLeft: "-5px" }} />
          {!showLogoApp && (
            <img
              src={logoText}
              alt="Logo"
              style={{
                marginTop: "3px",
                marginLeft: "10px",
                height: "38px",
              }}
            />
          )}
        </div>
        <Menu
          items={items}
          mode="inline"
          theme={"light"}
          selectedKeys={[currentPath]}
          style={{
            background: "none",
            border: "none",
            width: 256,
            color: "#fff",
            padding: "10px",
          }}
          className="custom-menu"
        />
      </Sider>
    </div>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{
          marginLeft: 25,
        }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={256}
        contentWrapperStyle={{
          boxShadow: "none",
        }}
        style={{
          backgroundColor: "#5a57ff",
          borderRadius: "0px 48px 48px 0px",
        }}
        placement="left"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
