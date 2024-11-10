import React, { useState } from "react";
import { Table, Input, Space } from "antd";

const { Search } = Input;

const TypePriceTable = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const tableData = [
    { id: 1, date: "2024-07-03", price: 1800.5 },
    { id: 2, date: "2024-07-02", price: 1795.75 },
    { id: 3, date: "2024-07-01", price: 1802.3 },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
    },
  ];

  // Filter data based on search text
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData.filter(
      (item) =>
        item.date.includes(value) || item.price.toString().includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Search
        placeholder="Search gold prices"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
      />

      <Table
        dataSource={searchText ? filteredData : tableData}
        columns={columns}
        pagination={false}
        style={{ marginTop: "20px" }}
        rowKey="id"
      />
    </Space>
  );
};

export default TypePriceTable;
