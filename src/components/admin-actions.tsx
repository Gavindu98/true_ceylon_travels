"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Link from "next/link";

export default function AdminActions() {
  return (
    <Space wrap>
      <Link href="/admin/dashboard?tab=memories">
        <Button type="primary" icon={<PlusOutlined />}>
          Add Memory
        </Button>
      </Link>
      <Link href="/admin/dashboard?tab=advertisements">
        <Button icon={<PlusOutlined />}>Add Advertisement</Button>
      </Link>
    </Space>
  );
}
