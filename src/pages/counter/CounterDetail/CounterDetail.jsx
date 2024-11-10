import React, { useState } from "react";
import "./CounterDetail.css";
import { Spin, Tabs } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetAllEmployeeByCounterIdQuery,
  useGetAllProductByCounterIdQuery,
  useGetCounterByIdQuery,
} from "../../../services/counterAPI";
import Employee from "./Employee";
import Product from "./Product";

export default function CounterDetail() {
  const { id } = useParams();
  const {
    data: counter,
    isLoading: isCounterLoading,
    error: counterError,
  } = useGetCounterByIdQuery(id);
  const {
    data: employees,
    isLoading: isEmployeesLoading,
    error: employeesError,
  } = useGetAllEmployeeByCounterIdQuery(id);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetAllProductByCounterIdQuery(id);

  if (isCounterLoading || isEmployeesLoading) {
    return <Spin />;
  }

  if (counterError || employeesError) {
    return <div>Error loading counter details.</div>;
  }

  const items = [
    {
      key: "1",
      label: "Employee",
      children: (
        <Employee loading={isEmployeesLoading} employeesData={employees} />
      ),
    },
    {
      key: "2",
      label: "Product",
      children: <Product productsData={products} />,
    },
  ];

  return (
    <div className="counter-detail">
      <div className="header">
        <h1 className="title">Counter Detail</h1> <hr />
        <div style={{ marginTop: 10 }}>
          <p style={{ fontSize: 18 }}>Counter Name: {counter.counterName}</p>
          <p style={{ fontSize: 18 }}>Location: {counter.location}</p>
        </div>
      </div>
      <div className="body">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
