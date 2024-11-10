import React, { useState, useEffect } from "react";
import "./EmployeeDetail.css";
import EmployeeInfo from "./EmployeeInfo";
import { useGetEmployeeByIdQuery } from "../../../services/employeeAPI";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import OrderHistory from "./OrderHistory";
import { useGetAllOrdersQuery } from "../../../services/orderAPI";

export default function EmployeeDetail() {
  const { id } = useParams(); // Extract id from params
  const {
    data: employeeData,
    error: employeeError,
    isLoading: isEmployeeLoading,
  } = useGetEmployeeByIdQuery(id); // Pass id to hook
  const {
    data: orderData,
    error: orderError,
    isLoading: isOrderLoading,
  } = useGetAllOrdersQuery();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isEmployeeLoading && !isOrderLoading) {
      setLoading(false);
    }
  }, [isEmployeeLoading, isOrderLoading]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spin size="large" />
      </div>
    );
  }

  if (employeeError || orderError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="employee-detail-page">
      <div className="header">
        <h1 className="title">Employee Information:</h1>
      </div>
      <div className="employee-info">
        <EmployeeInfo employeeData={employeeData} />{" "}
        {/* Pass data to EmployeeInfo */}
      </div>
      <div className="employee-order">
        <OrderHistory orderData={orderData} />
      </div>
    </div>
  );
}
