"use client";

import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Link from "next/link";

export default function AdminAuthActions() {
  return (
    <Space wrap>
      <Link href="/admin/signup">
        <Button icon={<UserAddOutlined />} className="!text-[var(--color-primary)] !border-[var(--color-primary)]">
          Sign Up
        </Button>
      </Link>
      <Link href="/admin/signin">
        <Button type="primary" icon={<LoginOutlined />} className="!text-white">
          Sign In
        </Button>
      </Link>
    </Space>
  );
}
