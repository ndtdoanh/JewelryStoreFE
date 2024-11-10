import { Badge, Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import React from "react";

export default function Information({ data }) {
  return (
    <div>
      {" "}
      <Descriptions bordered>
        <Descriptions.Item label="Order ID">{data.orderId}</Descriptions.Item>
        <Descriptions.Item label="Order Date">
          {dayjs(data.orderDate).format("DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Order Status">
          {data.orderStatus === 0 ? (
            <Badge status="default" text="Created" />
          ) : data.orderStatus === 1 ? (
            <Badge status="processing" text="Paying" />
          ) : data.orderStatus === 2 ? (
            <Badge status="success" text="Complete" />
          ) : (
            <Badge status="error" text="Cancel" />
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Customer Name">
          {data.customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="Employee Name">
          {data.employee.name}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {data.type === 1 ? (
            <Tag color="gold-inverse">Selling</Tag>
          ) : (
            <Tag color="blue-inverse">Buy Back</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
