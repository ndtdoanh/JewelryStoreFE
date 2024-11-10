import React, { useState, useMemo } from "react";
import "./Order.css";
import { Input, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ButtonCreateProduct from "../../components/ButtonFilter/ButtonCreate";
import OrderList from "./OrderManage/OrderList";
import OrderModal from "./OrderManage/OrderModal";
import { useGetAllOrdersQuery } from "../../services/orderAPI";

export default function Order() {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: orderData,
    error: orderError,
    isLoading: isOrderLoading,
  } = useGetAllOrdersQuery();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMakeOrderClick = () => {
    setIsCreateModalVisible(true);
  };

  const handleCancel = () => {
    setIsCreateModalVisible(false);
  };

  const filteredAndSortedOrderData = useMemo(() => {
    if (!orderData) return [];

    // Filter and sort the orderData
    return orderData
      .filter((order) =>
        order.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }, [orderData, searchQuery]);
  if (isOrderLoading) {
    return <Spin />;
  }

  if (orderError) {
    return <div>Error loading orders.</div>;
  }

  return (
    <div className="order-manage-page">
      <div className="header">
        <h1 className="title">Order Management</h1>
      </div>
      <div className="action">
        <div className="action-left">
          <Input
            style={{ borderRadius: 20, width: "350px" }}
            size="large"
            placeholder="Search by Order ID"
            prefix={<SearchOutlined />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="action-right">
          <div onClick={handleMakeOrderClick}>
            <ButtonCreateProduct contentBtn={"Make Order"} />
          </div>
        </div>
      </div>
      <div className="Customer-list">
        <OrderList
          orderData={filteredAndSortedOrderData}
          loading={isOrderLoading}
        />
      </div>
      <OrderModal visible={isCreateModalVisible} onCancel={handleCancel} />
    </div>
  );
}
