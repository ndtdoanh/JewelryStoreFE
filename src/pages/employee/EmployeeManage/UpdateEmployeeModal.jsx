import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Row, Col, Radio } from "antd";
import dayjs from "dayjs";
import "../Employee.css";

const { Option } = Select;

const UpdateEmployeeModal = ({
  visible,
  onUpdate,
  onCancel,
  loading,
  employee,
  countersData,
  employeeManage,
  employeesData,
}) => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(employee?.RoleId);
  const sortedCountersData = countersData
    ? [...countersData].sort((a, b) => a.counterId - b.counterId)
    : [];

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        employeeId: employee?.employeeId,
        name: employee?.name,
        email: employee?.email,
        phone: employee?.phone,
        counterId: employee?.counterId,
        employeeGender: employee?.employeeGender,
        roleId: employee?.roleId,
        managedBy: employee?.managedBy,
      });
      setUserType(employee?.roleId);
    }
  }, [form, visible, employee]);

  const handleDateChange = (date, dateString) => {
    console.log("Selected DOB:", date);
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    if (value === 2 || value === 3) {
      form.setFieldsValue({ counter: 0 });
    }
  };

  return (
    <div className="update-employee-page">
      <Modal
        open={visible}
        title="Update Employee"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        okButtonProps={{ loading }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.DoB) {
                values.DoB = Math.floor(values.DoB.valueOf() / 1000);
              }
              onUpdate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Row>
            <Form.Item
              style={{ display: "none" }}
              name="employeeId"
              rules={[
                {
                  required: true,
                  message: "Please input the name of the user!",
                },
              ]}
            >
              <Input placeholder="Input the full name..." />
            </Form.Item>
            <Col span={8}>
              <p>Full Name:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input the name of the user!",
                  },
                ]}
              >
                <Input placeholder="Input the full name..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Email:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input the email of the user!",
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please input a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Input the email..." />
              </Form.Item>
            </Col>
            <Col span={8}>
              <p>Phone number:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input the phone number of the user!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please input a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Input the phone number..." />
              </Form.Item>
            </Col>
            <Col span={8}>Gender</Col>
            <Col span={16}>
              <Form.Item
                name="employeeGender"
                rules={[
                  {
                    required: true,
                    message: "Please choose the gender!",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value={0}> Male </Radio>
                  <Radio value={1}> Female </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={8}>User Type:</Col>
            <Col span={16}>
              <Form.Item
                name="roleId"
                rules={[
                  {
                    required: true,
                    message: "Please select the role of the user!",
                  },
                ]}
              >
                <Select
                  placeholder="Select user type: "
                  onChange={handleUserTypeChange}
                >
                  {RoleOption.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {userType !== 2 && userType !== 3 && (
              <>
                <Col span={8}>
                  <p>Counter:</p>
                </Col>
                <Col span={16}>
                  <Form.Item
                    name="counterId"
                    rules={[
                      {
                        required: true,
                        message: "Please select the counter!",
                      },
                    ]}
                  >
                    <Select placeholder="Select the counter...">
                      {sortedCountersData &&
                        sortedCountersData.map((counter) => (
                          <Option
                            key={counter.counterId}
                            value={counter.counterId}
                          >
                            {counter.counterName}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={8}>
              <p>Manage By:</p>
            </Col>
            <Col span={16}>
              <Form.Item
                name="managedBy"
                rules={[
                  {
                    required: true,
                    message: "Please select the manage!",
                  },
                ]}
              >
                <Select placeholder="Select the manger...">
                  {employeeManage &&
                    employeeManage.map((employee) => (
                      <Option
                        key={employee.employeeId}
                        value={employee.employeeId}
                      >
                        {employee.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

const RoleOption = [
  { value: 1, label: "Staff" },
  { value: 2, label: "Manager" },
  { value: 3, label: "Admin" },
];

const CounterOption = [
  { value: 1, label: "Counter 1" },
  { value: 2, label: "Counter 2" },
  { value: 3, label: "Counter 3" },
];

export default UpdateEmployeeModal;
