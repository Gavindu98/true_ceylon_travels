"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

export default function UiProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#003527",
          colorInfo: "#003527",
          colorBgBase: "#FCF9F2",
          colorTextBase: "#1C1C18",
          borderRadius: 10,
          fontFamily: "var(--font-plus-jakarta-sans), Arial, Helvetica, sans-serif",
        },
        components: {
          Button: {
            borderRadius: 999,
          },
          Dropdown: {
            borderRadiusLG: 12,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
