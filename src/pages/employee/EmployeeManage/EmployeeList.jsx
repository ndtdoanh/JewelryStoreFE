import React from "react";
import { Space, Table, Tag, Dropdown, Menu, Popconfirm } from "antd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { RiUserFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";

const roleMapping = {
  1: "Staff",
  2: "Manager",
  3: "Admin",
  4: "Super Admin",
};

const roleColorMapping = {
  1: "cyan",
  2: "geekblue",
  3: "gold",
  4: "green",
};

const statusMapping = {
  0: "Active",
  1: "Inactive",
  2: "Unassign",
  3: "Deleted",
};
const statusColorMapping = {
  0: "#66FF00",
  1: "#696969",
  2: "#FFCC00",
  3: "#BB0000",
};

export default function EmployeeList({
  employeesData,
  onEditEmployee,
  handleRemoveEmployee,
  handleChangeStatusEmployee,
  loading,
  handleResetPassword,
}) {
  const navigate = useNavigate();

  const actionsMenu = (record) => (
    <Menu align="center">
      {/* <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/employee/${record.employeeId}`)}
      >
        <span>View Detail</span>
      </Menu.Item> */}

      <Menu.Item
        key="edit"
        className="submenu-usertable"
        onClick={() => onEditEmployee(record)}
      >
        <span>Edit Employee</span>
      </Menu.Item>

      {record.employeeStatus === 0 ? (
        <>
          <Menu.Item key="inactive" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to inactive this user?"
              onConfirm={() => handleChangeStatusEmployee(record.employeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Inactive</span>
            </Popconfirm>
          </Menu.Item>
        </>
      ) : (
        <>
          {" "}
          <Menu.Item key="deleted" className="submenu-usertable">
            <Popconfirm
              title="Are you sure you want to delete this user?"
              onConfirm={() => handleChangeStatusEmployee(record.employeeId)}
              okText="Yes"
              cancelText="No"
            >
              <span>Active</span>
            </Popconfirm>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="remove">
        <Popconfirm
          title="Are you sure you want to remove this user?"
          onConfirm={() => handleRemoveEmployee(record.employeeId)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-usertable-dropdown-delete">
            <span>Remove employee</span>
          </p>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="resetPassword">
        <Popconfirm
          title="Are you sure you want to reset password this user?"
          onConfirm={() => handleResetPassword(record.employeeId)}
          okText="Yes"
          cancelText="No"
        >
          <p className="submenu-usertable-dropdown-delete">
            <span>Reset password employee</span>
          </p>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const dataWithNo = employeesData?.map((item, index) => ({
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
      title: "Name",
      dataIndex: "name",
      align: "left",
      key: "name",
    },
    {
      title: "Email",
      align: "left",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Counter",
      dataIndex: "counterName",
      key: "CounterName",
      render: (counterName) => (counterName ? `${counterName}` : "No Counter"),
    },
    {
      title: "Gender",
      dataIndex: "employeeGender",
      align: "center",
      key: "gender",
      render: (employeeGender) =>
        employeeGender === 0 ? (
          <i className="ri-user-fill" style={{ color: "#4f6c95" }}>
            <RiUserFill />
          </i>
        ) : (
          <i className="ri-user-fill" style={{ color: "#cc5e58" }}>
            <RiUserFill />
          </i>
        ),
    },
    {
      title: "Role",
      dataIndex: "roleId",
      align: "center",
      key: "roleId",
      render: (roleId) => (
        <Tag color={roleColorMapping[roleId] || "warning"}>
          {roleMapping[roleId] || "NaN"}
        </Tag>
      ),
    },
    {
      title: "Status",
      align: "center",
      key: "Status",
      dataIndex: "employeeStatus",
      render: (employeeStatus) => (
        <Tag color={statusColorMapping[employeeStatus] || "warning"}>
          {statusMapping[employeeStatus] || "NaN"}
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
    <Table
      columns={columns}
      dataSource={dataWithNo}
      rowKey="id"
      pagination={{
        pageSize: 5,
        showSizeChanger: false, // Ẩn phần chọn số lượng mục hiển thị trên mỗi trang
      }}
      loading={loading}
    />
  );
}
