import React, { useState } from "react";
import { Table, Modal, Button, Form, Select, message } from "antd";
import {
  useCreateTransactionMutation,
  useGetAllCustomersQuery,
  useGetAllTransactionQuery,
} from "../../services/customerAPI";
import { useGetAllGiftQuery } from "../../services/giftAPI";

const { Option } = Select;

const Transition = () => {
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    refetch: refetchTran,
    error: transactionsError,
  } = useGetAllTransactionQuery();

  const {
    data: customersData,
    isLoading: customersLoading,
    error: customersError,
  } = useGetAllCustomersQuery();

  const {
    data: giftsData,
    isLoading: giftsLoading,
    error: giftsError,
  } = useGetAllGiftQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [createTransaction, { isLoading: isCreatingTransaction }] =
    useCreateTransactionMutation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await createTransaction({
        customerId: selectedCustomerId,
        giftId: selectedGiftId,
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        message.success(response.error.data);
        setIsModalVisible(false);
        refetchTran();
      } else {
        message.error(response.error.data);
      }
    } catch (error) {
      console.log(error);
      message.error(error.data);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Gift ID",
      dataIndex: "giftId",
      key: "giftId",
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
      key: "customerId",
    },
    {
      title: "Transaction Date Time",
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
    },
    {
      title: "Points Minus",
      dataIndex: "pointMinus",
      key: "pointMinus",
    },
  ];

  if (transactionsLoading || customersLoading || giftsLoading)
    return <div>Loading...</div>;
  if (transactionsError || customersError || giftsError)
    return <div>Error loading data.</div>;

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Transaction
      </Button>
      <Table
        dataSource={transactionsData}
        columns={columns}
        rowKey="transactionId"
      />
      <Modal
        title="Select Customer and Gift"
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={isCreatingTransaction}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Customer ID">
            <Select
              placeholder="Select Customer ID"
              onChange={setSelectedCustomerId}
            >
              {customersData.map((customer) => (
                <Option key={customer.customerId} value={customer.customerId}>
                  {customer.name} - {customer.accumulatedPoint}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Gift ID">
            <Select placeholder="Select Gift ID" onChange={setSelectedGiftId}>
              {giftsData.map((gift) => (
                <Option key={gift.giftId} value={gift.giftId}>
                  {gift.giftName} - {gift.pointRequired}point
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Transition;
