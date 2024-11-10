import { Button, Dropdown, Menu, Popconfirm, Space, Table, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";

export default function OrderList({ orderData, loading }) {
  const typeMapping = {
    0: "Buy Back",
    1: "Sell",
  };

  const typeColorMapping = {
    1: "green",
    2: "blue",
  };

  const paymentMapping = {
    1: "Cash",
    2: "Banking",
  };

  const paymentColorMapping = {
    1: "blue		",
    2: "green		",
  };

  const statusMapping = {
    0: "Created",
    1: "Paying",
    2: "Completed",
    3: "Cancelled",
  };

  const statusColorMapping = {
    0: "	purple	",
    1: "	blue	",
    2: "green		",
    3: "red		",
  };
  const navigate = useNavigate();
  const dataWithNo = orderData?.map((order, index) => ({
    ...order,
    no: index + 1,
  }));

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/order/${record.orderId}`)}
      >
        <span>View Detail</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 55,
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Employee",
      dataIndex: ["employee", "name"], // Accessing name field within employee object
      key: "employeeName",
    },
    {
      title: "Customer",
      dataIndex: ["customer", "name"], // Accessing name field within employee object
      key: "customer",
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      align: "center",
      key: "date",
      render: (OrderDate) => dayjs(OrderDate).format("DD/MM/YYYY"),
    },
    {
      title: "Type",
      dataIndex: "type",
      align: "center",
      key: "type",
      render: (type) => (
        <Tag color={typeColorMapping[type] || "#333"}>
          {typeMapping[type] || "NaN"}
        </Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentId",
      align: "center",
      key: "paymentId",
      render: (type) => (
        <Tag
          style={{ fontWeight: "bold" }}
          color={paymentColorMapping[type] || "#333"}
        >
          {paymentMapping[type] || "NaN"}
        </Tag>
      ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      key: "status",
      align: "center",
      dataIndex: "orderStatus",
      render: (orderStatus) => (
        <Tag
          style={{ fontWeight: "bold" }}
          color={statusColorMapping[orderStatus] || "#333"}
        >
          {statusMapping[orderStatus] || "NaN"}
        </Tag>
      ),
    },
    {
      width: 55,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Dropdown overlay={actionsMenu(record)} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
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
          loading={loading}
        />
      </div>
    </div>
  );
}
