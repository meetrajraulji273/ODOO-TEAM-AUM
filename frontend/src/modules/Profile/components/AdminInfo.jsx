import React from "react";
import { PageHeader } from "@ant-design/pro-layout";
import { ArrowLeftOutlined } from "@ant-design/icons";

function AdminInfo({ config }) {
  const { PANEL_TITLE } = config;
  return (
    <>
      <PageHeader
        onBack={() => window.history.back()}
        title={PANEL_TITLE}
        ghost={false}
        backIcon={<ArrowLeftOutlined className="custom-back-icon" />}
        className="custom-page-header"
      ></PageHeader>
    </>
  );
}

export default AdminInfo;
