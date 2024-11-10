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

export default function EmployeeList({ employeesData, loading }) {
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
    // {
    //   title: "Counter",
    //   dataIndex: "counterName",
    //   key: "CounterName",
    //   render: (counterName) => (counterName ? `${counterName}` : "No Counter"),
    // },
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
