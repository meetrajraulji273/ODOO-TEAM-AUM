import { ConfigProvider } from 'antd';

export default function Localization({ children }) {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          // colorPrimary: '#5a57ff',
          // colorLink: '#5a57ff',
          borderRadius: 8,
          colorBgContainer:"#5a57ff",
          colorTextBase:"#000000",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
