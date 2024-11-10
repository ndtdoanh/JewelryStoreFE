import React, { useEffect, useState } from "react";
import "./Customer.css";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import CustomerList from "./CustomerManage/CustomerList";
import {
  useCreateCustomerMutation,
  useGetAllCustomersQuery,
  useUpdateCustomerMutation,
} from "../../services/customerAPI";
import CreateCustomerModal from "./CustomerManage/CreateCustomerModal";
import UpdateCustomerModel from "./CustomerManage/UpdateCustomerModel";

export default function Customer() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { data: customerData, refetch, isFetching } = useGetAllCustomersQuery();
  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();

  useEffect(() => {
    if (!isFetching && customerData) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isFetching, customerData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomer = customerData
    ?.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleCreate = async (values) => {
    setLoading(true);
    try {
      await createCustomer(values).unwrap();
      refetch();
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
    setLoading(false);
  };

  const handleUpdate = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      await updateCustomer(values).unwrap();
      refetch();
      setIsUpdateModalVisible(false);
    } catch (error) {
      console.error("Failed to update customer:", error);
    }
    setLoading(false);
  };

  const handleEdit = (customer) => {
    console.log(customer);
    setSelectedCustomer(customer);
    setIsUpdateModalVisible(true);
  };

  return (
    <div className="customer-manage-page">
      <div className="header">
        <h1 className="title">Customer Management</h1>
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
            <ButtonCreateProduct contentBtn={"Create Customer"} />
          </div>
        </div>
      </div>
      <div className="Customer-list">
        <CustomerList
          customerData={filteredCustomer}
          loading={loading}
          handleEdit={handleEdit}
        />
      </div>
      <CreateCustomerModal
        visible={isCreateModalVisible}
        onCreate={handleCreate}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={loading}
        customerData={customerData}
      />
      <UpdateCustomerModel
        visible={isUpdateModalVisible}
        onCreate={handleUpdate}
        onCancel={() => setIsUpdateModalVisible(false)}
        loading={loading}
        customer={selectedCustomer}
        customerData={customerData}
      />
    </div>
  );
}
