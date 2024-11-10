import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Radio } from "antd";
import "../Employee.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";

const { Option } = Select;

const CreateEmployeeModal = ({
  visible,
  onCreate,
  onCancel,
  loading,
  employeesData,
  countersData,
}) => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState(null);
  const sortedCountersData = countersData
    ? [...countersData].sort((a, b) => a.counterId - b.counterId)
    : [];
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
      setUserType(null);
    }
  }, [form, visible]);

  const handleUserTypeChange = (value) => {
    setUserType(value);
    if (value === "2" || value === "3") {
      form.setFieldsValue({ counter: 0 });
    }
  };

  const validateEmail = async (_, value) => {
    if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return Promise.reject(new Error("Please input a valid email address"));
    }
    if (employeesData.some((employee) => employee.email === value)) {
      return Promise.reject(new Error("Email already exists"));
    }
    return Promise.resolve();
  };

  const validatePhone = async (_, value) => {
    if (!/^(0\d{9})$/.test(value)) {
      return Promise.reject(
        new Error("Phone number must be 10 digits starting with 0")
      );
    }
    if (employeesData.some((employee) => employee.phone === value)) {
      return Promise.reject(new Error("Phone number already exists"));
    }
    return Promise.resolve();
  };

  const roleOptions = {
    4: [
      { value: "1", label: "Staff" },
      { value: "2", label: "Manager" },
      { value: "3", label: "Admin" },
    ],
    3: [
      { value: "1", label: "Staff" },
      { value: "2", label: "Manager" },
    ],
    2: [{ value: "1", label: "Staff" }],
  };

  return (
    <div className="create-employee-page">
      <Modal
        visible={visible}
        title="Create a new employee"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        confirmLoading={loading}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (values.dob) {
                values.dob = Math.floor(values.dob.valueOf() / 1000);
              }
              onCreate(values);
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
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the user!",
              },
            ]}
          >
            <Input placeholder="Input the full name..." />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the email of the user!",
              },
              {
                validator: validateEmail,
              },
            ]}
          >
            <Input placeholder="Input the email..." />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Please input the phone number of the user!",
              },
              {
                validator: validatePhone,
              },
            ]}
          >
            <Input placeholder="Input the phone number..." />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
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

          <Form.Item
            name="role"
            label="User Type"
            rules={[
              {
                required: true,
                message: "Please select the role of the user!",
              },
            ]}
          >
            <Select
              placeholder="Select user type"
              onChange={handleUserTypeChange}
            >
              {roleOptions[auth.Role].map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {userType !== "2" && userType !== "3" && (
            <Form.Item
              name="counter"
              label="Counter"
              rules={[
                {
                  required: true,
                  message: "Please select the counter!",
                },
              ]}
            >
              <Select placeholder="Select the counter...">
                {sortedCountersData.map((counter) => (
                  <Option key={counter.counterId} value={counter.counterId}>
                    {counter.counterName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CreateEmployeeModal;
