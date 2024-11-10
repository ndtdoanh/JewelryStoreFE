import { Badge, Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function Information({ orderInfo }) {
  return (
    <div>
      {" "}
      <Descriptions bordered>
        <Descriptions.Item label="Order ID">
          {orderInfo.orderId}
        </Descriptions.Item>
        <Descriptions.Item label="Order Date">
          {dayjs(orderInfo.orderDate).format("DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Order Status">
          {orderInfo.orderStatus === 0 ? (
            <Badge status="default" text="Created" />
          ) : orderInfo.orderStatus === 1 ? (
            <Badge status="processing" text="Paying" />
          ) : orderInfo.orderStatus === 2 ? (
            <Badge status="success" text="Complete" />
          ) : (
            <Badge status="error" text="Cancel" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Customer Name">
          {orderInfo.customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="Employee Name">
          {orderInfo.employee.name}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {orderInfo.type === 1 ? (
            <Tag color="gold-inverse">Selling</Tag>
          ) : (
            <Tag color="blue-inverse">Buy Back</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
