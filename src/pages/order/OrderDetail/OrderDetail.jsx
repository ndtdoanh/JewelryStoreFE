import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../services/orderAPI";
import { Descriptions, List, Card, Spin, Alert, Flex, Button } from "antd";
import "./OrderDetail.css";
import Information from "./Information";
import OrderList from "./OrderList";
export default function OrderDetail() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderByIdQuery(id);

  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      console.log("Order Detail Data:", data);
    }
    if (error) {
      console.error("Error fetching order details:", error);
    }
  }, [data, error]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error fetching order details" type="error" />;
  }

  if (!data) {
    return <Alert message="No order details found" type="warning" />;
  }

  const handleBack = () => {
    navigate("/order");
  };

  return (
    <div className="order-detail-page">
      <div>
        <div className="header">
          <p className="title">Order Information</p>
          <hr />
        </div>
        <Information data={data} />

        <OrderList data={data} />
      </div>
      <div style={{ marginTop: "40px" }}>
        <Flex justify="space-between">
          <div></div>
          <Button
            style={{
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "#333",
            }}
            onClick={handleBack}
          >
            Back Order
          </Button>
        </Flex>
      </div>
    </div>
  );
}
