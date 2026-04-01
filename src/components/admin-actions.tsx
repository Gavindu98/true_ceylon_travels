"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import Link from "next/link";

export default function AdminActions() {
  return (
    <Space wrap>
      <Link href="/admin/memory">
        <Button type="primary" icon={<PlusOutlined />}>
          Add Memory
        </Button>
      </Link>
    </Space>
  );
}
