"use client";

import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Link from "next/link";

export default function AdminAuthActions() {
  return (
    <Space wrap>
      <Link href="/admin/signup">
        <Button icon={<UserAddOutlined />}>Sign Up</Button>
      </Link>
      <Link href="/admin/signin">
        <Button type="primary" icon={<LoginOutlined />}>
          Sign In
        </Button>
      </Link>
    </Space>
  );
}
