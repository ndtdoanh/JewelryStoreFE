import React from "react";
import { Dropdown, Menu, Space, Table, Tag } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RiUserFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

export default function CustomerList({ counterData, loading, handleEdit }) {
  // Adjusted processed data and columns
  const processedData = counterData?.map((customer, index) => ({
    ...customer,
    no: index + 1,
  }));

  const navigate = useNavigate();

  const handleViewDetail = (counterId) => {
    navigate(`/counter/${counterId}`);
  };
  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => handleViewDetail(record.counterId)}
      >
        <span>View Detail</span>
      </Menu.Item>

      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => handleEdit(record)}
      >
        <span>Edit Counter</span>
      </Menu.Item>

      <Menu.Item key="remove">
        <span>Remove Counter</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Counter Name",
      dataIndex: "counterName",
      key: "counterName",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      align: "center",
      key: "isActive",
      dataIndex: "isActive",
      render: (isActive) => (
        <Tag color={isActive == true ? "green-inverse" : "volcano-inverse"}>
          {isActive == true ? "Active" : "Inactive"}
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
      <Table
        dataSource={processedData}
        columns={columns}
        loading={loading}
        pagination={{
          pageSize: 5,
          showSizeChanger: false, // Ẩn phần chọn số lượng mục hiển thị trên mỗi trang
        }}
      />
    </div>
  );
}
