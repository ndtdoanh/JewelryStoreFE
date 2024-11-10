import React from "react";
import {
  Modal,
  Button,
  Form,
  DatePicker,
  InputNumber,
  Switch,
  message,
} from "antd";

export default function CustomerPolicy({
  customerId,
  visible,
  onClose,
  createCustomerPolicy,
}) {
  const [form] = Form.useForm();
  // const [createPolicy] = useCreateCustomerPolicyMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      const requestData = {
        customerId,
        discountRate: values.discountRate,
        validFrom: values.validFrom.toISOString(),
        validTo: values.validTo.toISOString(),
        publishingStatus: 0, // Convert boolean to integer
        isApprovalRequired: true,
      };
      console.log(requestData);

      const response = await createCustomerPolicy(requestData);
      console.log("Create policy response:", response);

      if (response.error.originalStatus === 200) {
        message.success("Customer policy created successfully!");
        form.resetFields();
        onClose(); // Close the modal after successful creation
      } else {
        message.error(response.error.data);
      }
    } catch (error) {
      console.error("Error creating customer policy:", error);
      message.error("An error occurred while creating customer policy");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create Customer Policy"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create Policy
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="customerPolicyForm"
        initialValues={{
          discountRate: 0,
          validFrom: null,
          validTo: null,
          publishingStatus: false,
          isApprovalRequired: true,
        }}
      >
        <Form.Item
          name="discountRate"
          label="Discount Rate (%)"
          rules={[
            { required: true, message: "Please input the discount rate" },
          ]}
        >
          <InputNumber min={1} max={100} />
        </Form.Item>
        <Form.Item
          name="validFrom"
          label="Valid From"
          rules={[{ required: true, message: "Please select the start date" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="validTo"
          label="Valid To"
          rules={[{ required: true, message: "Please select the end date" }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        {/* <Form.Item
          name="publishingStatus"
          label="Publishing Status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="isApprovalRequired"
          label="Requires Approval"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item> */}
      </Form>
    </Modal>
  );
}
