import React, { useEffect, useState } from "react";
import "./Employee.css";
import { Button, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreate from "../../components/ButtonFilter/ButtonCreate";
import CreateEmployeeModal from "./EmployeeManage/CreateEmployeeModal";
import {
  useAddEmployeeMutation,
  useRemoveEmployeeMutation,
  useGetAllEmployeeQuery,
  useUpdateEmployeeMutation,
  useChangeEmployeeStatusMutation,
  useResetPasswordMutation,
} from "../../services/employeeAPI";
import EmployeeList from "./EmployeeManage/EmployeeList";
import UpdateEmployeeModal from "./EmployeeManage/UpdateEmployeeModal";
import { useGetAllCountersQuery } from "../../services/counterAPI";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

export default function Employee() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: employeesData, refetch, isFetching } = useGetAllEmployeeQuery();
  const { data: countersData } = useGetAllCountersQuery();
  const [addEmployee, { isLoading: isLoadingAdd }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: isLoadingUpdate }] =
    useUpdateEmployeeMutation();
  const [removeEmployee, { isLoading: isLoadingRemove }] =
    useRemoveEmployeeMutation();
  const [changeStatusEmployee, { isLoading: isLoadingStatus }] =
    useChangeEmployeeStatusMutation();

  const [resetPassword] = useResetPasswordMutation();
  const auth = useSelector(selectAuth);
  const role = auth?.Role;
  const employeeId = auth?.EmployeeId;

  useEffect(() => {
    if (!isFetching && employeesData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isFetching, employeesData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Kiểm tra nếu employeesData và auth tồn tại trước khi lọc
  if (!employeesData || !role || !employeeId) {
    console.error("Missing required data for filtering");
    return null; // hoặc trả về loading state hoặc thông báo lỗi
  }

  // const filteredEmployees = employeesData.filter((employee) => {
  //   const matchesSearchQuery =
  //     employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     employee.phone.includes(searchQuery);

  //   const isNotCurrentUser = employee.employeeId !== employeeId;

  //   return matchesSearchQuery && isNotCurrentUser;
  // });
  const filteredEmployees = employeesData.filter((employee) => {
    const matchesSearchQuery =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery);

    const isNotCurrentUser = employee.employeeId !== employeeId;

    // Xác định người dùng hiện tại và các role họ có thể thấy
    const userRoleId = parseInt(auth.Role); // Chuyển đổi Role từ chuỗi thành số nguyên
    const allowedRoles = {
      4: [1, 2, 3],
      3: [1, 2],
      2: [1],
      1: [],
    };

    const hasDesiredRole = allowedRoles[userRoleId]?.includes(employee.roleId);

    return matchesSearchQuery && isNotCurrentUser && hasDesiredRole;
  });

  // Sắp xếp filteredEmployees theo tên theo thứ tự tăng dần
  const sortedEmployees = filteredEmployees.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Kiểm tra kết quả lọc và sắp xếp
  if (!sortedEmployees || sortedEmployees.length === 0) {
    console.warn("No employees found after filtering and sorting");
  }

  const handleCreateEmployee = async (values) => {
    console.log(values);
    try {
      const response = await addEmployee(values);

      console.log(response);
      if (response.error.originalStatus === 200) {
        message.success("Employee created successfully");
        setIsCreateModalVisible(false);
        refetch();
      } else {
        message.error(response.error.data.message);
      }
    } catch (error) {
      message.error("Failed to create employee");
    }
  };

  const handleUpdateEmployee = async (values) => {
    console.log(values);

    // try {
    const result = await updateEmployee({
      employee: values,
    });
    console.log(result);
    if (result.error.originalStatus === 200) {
      message.success("Employee updated successfully");
      setIsUpdateModalVisible(false);
      refetch();
    } else {
      message.error("Employee updated unsuccessfully");
    }
    // } catch (error) {
    // message.error("Failed to update employee");
    // }
  };
  const handleRemoveEmployee = async (value) => {
    try {
      const result = await removeEmployee(value);
      console.log(result);
      if (result.error.originalStatus === 200) {
        message.success("Employee remove successfully");
        setIsUpdateModalVisible(false);
        refetch();
      } else {
        message.error("Employee remove unsuccessfully");
      }
    } catch (error) {
      message.error("Failed to remove employee");
    }
  };
  const handleChangeStatusEmployee = async (value) => {
    console.log(value);
    try {
      const result = await changeStatusEmployee(value);
      console.log(result);
      message.success("Employee active successfully");
      refetch();
    } catch (error) {
      message.error("Failed to active employee");
    }
  };
  const handleResetPassword = async (value) => {
    console.log(value);
    try {
      const result = await resetPassword({ employeeId: value });
      console.log(result);
      message.success("Reset password successfully");
      refetch();
    } catch (error) {
      message.error("Failed to active employee");
    }
  };

  const filteredEmployeeManage = employeesData.filter((employee) => {
    const matchesSearchQuery =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.phone.includes(searchQuery);

    const isNotCurrentUser = employee.employeeId !== employeeId;

    const hasDesiredRole = [2, 3, 4].includes(employee.roleId);

    return matchesSearchQuery && isNotCurrentUser && hasDesiredRole;
  });

  return (
    <div className="employee-manage-page">
      <div className="header">
        <h1 className="title">Employee Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by name or phone number"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="action-right">
          <div onClick={() => setIsCreateModalVisible(true)}>
            <ButtonCreate contentBtn={"Create User"} />
          </div>
        </div>
      </div>
      <div className="employee-list">
        <EmployeeList
          loading={loading}
          employeesData={sortedEmployees}
          onEditEmployee={(employee) => {
            setSelectedEmployee(employee);
            setIsUpdateModalVisible(true);
          }}
          handleResetPassword={handleResetPassword}
          handleRemoveEmployee={handleRemoveEmployee}
          handleChangeStatusEmployee={handleChangeStatusEmployee}
        />
      </div>
      <CreateEmployeeModal
        countersData={countersData}
        visible={isCreateModalVisible}
        onCreate={handleCreateEmployee}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={isLoadingAdd}
        employeesData={employeesData}
      />
      <UpdateEmployeeModal
        visible={isUpdateModalVisible}
        onUpdate={handleUpdateEmployee}
        onCancel={() => setIsUpdateModalVisible(false)}
        loading={isLoadingUpdate}
        employee={selectedEmployee}
        employeesData={employeesData}
        countersData={countersData}
        employeeManage={filteredEmployeeManage}
      />
    </div>
  );
}
