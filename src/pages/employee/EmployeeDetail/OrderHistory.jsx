import { Button, Table, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function OrderHistory({ orderData }) {
  const dataWithNo = orderData?.map((order, index) => ({
    ...order,
    no: index + 1,
  }));

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 55,
    },
    {
      title: <div style={{ textAlign: "start" }}>Order Id</div>,
      dataIndex: "OrderId",
      key: "order",
    },
    {
      title: <div style={{ textAlign: "start" }}>Date</div>,
      dataIndex: "OrderDate",
      key: "date",
      render: (OrderDate) => dayjs(OrderDate).format("DD/MM/YYYY"),
    },
    {
      title: <div style={{ textAlign: "center" }}>Type</div>,
      dataIndex: "Type",
      key: "type",
      render: (Type) => (
        <div style={{ textAlign: "center" }}>
          <Tag color={Type === 0 ? "gold" : Type === 1 ? "green" : "warning"}>
            {Type === 0 ? "Buy Back" : Type === 1 ? "Selling" : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Counter",
      dataIndex: "CounterId",
      key: "CounterId",
      render: (CounterId) =>
        CounterId ? `Counter ${CounterId}` : "No Counter",
    },
    {
      width: 55,
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => handleViewDetail(record)}>
          View Detail
        </Button>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginTop: 10 }}>
        <Table
          columns={columns}
          dataSource={dataWithNo}
          rowKey="id"
          pagination={{ pageSize: 4 }}
          //   loading={loading}
        />
      </div>
    </div>
  );
}
