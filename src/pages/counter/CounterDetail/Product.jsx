import React from "react";
import { Table, Tag } from "antd";

const statusMapping = {
  0: "Active",
  1: "Inactive",
  2: "Unassign",
  3: "Deleted",
};

const statusColorMapping = {
  0: "#66FF00",
  1: "#BB0000",
  2: "#FFCC00",
  3: "#696969",
};

const weightUnitMapping = {
  0: "gram",
  1: "carat",
};

export default function Product({ productsData, loading }) {
  const dataWithNo = productsData?.map((item, index) => ({
    ...item,
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
      title: "Image",
      dataIndex: "img",
      align: "center",
      width: 55,
      key: "img",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.img}
            alt={text}
            style={{ width: 50, height: 50, marginRight: 10 }}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      align: "left",
      key: "name",
    },
    {
      title: "Barcode",
      dataIndex: "barcode",
      align: "left",
      key: "barcode",
    },

    {
      title: "Weight",
      align: "center",
      dataIndex: "weight",
      key: "weight",
      render: (text, record) =>
        `${text} ${weightUnitMapping[record.weightUnit]}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
    },

    {
      title: "Type",
      align: "center",
      dataIndex: "typeName",
      key: "typeName",
    },

    {
      title: "Status",
      align: "center",
      key: "status",
      dataIndex: "productStatus",
      render: (productStatus) => (
        <Tag color={statusColorMapping[productStatus] || "warning"}>
          {statusMapping[productStatus] || "NaN"}
        </Tag>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataWithNo}
      rowKey="productId"
      pagination={{
        pageSize: 5,
        showSizeChanger: false, // Ẩn phần chọn số lượng mục hiển thị trên mỗi trang
      }}
      loading={loading}
    />
  );
}
