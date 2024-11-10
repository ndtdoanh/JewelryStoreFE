import { Dropdown, Menu, Popconfirm, Space, Table } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { RiUserFill } from "@remixicon/react";

export default function CustomerList({ customerData, loading, handleEdit }) {
  const processedData = customerData?.map((customer, index) => ({
    ...customer,
    no: index + 1,
  }));

  const actionsMenu = (record) => (
    <Menu>
      {/* <Menu.Item
        key="detail"
        className="submenu-usertable"
        // onClick={() => navigate(`/employee/${record.EmployeeId}`)}
      >
        <span>View Detail</span>
      </Menu.Item> */}

      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => handleEdit(record)}
      >
        <span>Edit Customer</span>
      </Menu.Item>

      {/* <Menu.Item key="remove">
        <Popconfirm
          title="Are you sure you want to remove this user?"
          // onConfirm={() => handleRemoveEmployee(record.EmployeeId)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-usertable-dropdown-delete">
            <span>Remove Customer</span>
          </p>
        </Popconfirm>
      </Menu.Item> */}
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: <div style={{ textAlign: "center" }}>Gender</div>,
      dataIndex: "customerGender",
      key: "Gender",
      render: (customerGender) =>
        customerGender === 0 ? (
          <div style={{ textAlign: "center" }}>
            <i className="ri-user-fill" style={{ color: "#4f6c95" }}>
              <RiUserFill />
            </i>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <i className="ri-user-fill" style={{ color: "#cc5e58" }}>
              <RiUserFill />
            </i>
          </div>
        ),
    },
    {
      title: <div style={{ textAlign: "center" }}>Accumulated Point</div>,
      dataIndex: "accumulatedPoint",
      key: "accumulatedPoint",
      render: (accumulatedPoint) => (
        <div style={{ textAlign: "center" }}>{accumulatedPoint}</div>
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
      <Table
        dataSource={processedData}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
