import { Badge, Descriptions } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";

export default function CustomerInformation({ customerInfo }) {
  const currentDate = new Date().toLocaleDateString();
  const auth = useSelector(selectAuth);

  const items = [
    {
      key: "1",
      label: "Billing Date",
      children: currentDate,
    },
    {
      key: "2",
      label: "Make by",
      children: auth.EmployeeName || "-",
    },
    {
      key: "3",
      label: "Type",
      children: "Sold",
    },
    {
      key: "7",
      label: "Counter",
      children: auth.CounterName || "-",
    },
    {
      key: "4",
      label: "Customer Name",
      children: customerInfo?.name || "-",
    },
    {
      key: "5",
      label: "Customer Phone",
      children: customerInfo?.phone || "-",
    },

    {
      key: "6",
      label: "Address",
      children: customerInfo?.address || "-",
    },
    {
      key: "10",
      label: "Point",
      children: customerInfo?.accumulatedPoint || "-",
    },
  ];

  return (
    <div>
      <br />
      <div className="description">
        <Descriptions bordered items={items} />
      </div>
    </div>
  );
}
