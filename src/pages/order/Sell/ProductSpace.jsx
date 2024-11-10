import React, { useState, useEffect } from "react";
import { Table, Button, Input, Badge, Image } from "antd";
import { formatPrice } from "../../../utils/utils";
import ProductDetailsModal from "./ProductDetailsModal"; // Adjust the path as needed
import "./Sell.css";

const { Search } = Input;

export default function ProductSpace({ productsData = [], onAddToCart, auth }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const data = productsData.map((item, index) => ({
      key: item?.productId || index + 1,
      id: item?.productId,
      name: item?.name,
      barcode: item?.barcode,
      typeName: item?.typePrice?.typeName,
      typeBuy: item?.typePrice?.buyPricePerGram,
      typeSell: item?.typePrice?.sellPricePerGram,
      manufactureCost: item?.manufactureCost,
      stonePrice: item?.stonePrice,
      markupRate: item?.markupRate,
      weight: item?.weight,
      status: item?.productStatus,
      counterName: item?.counterName,
      counterId: item?.counterId,
      quantity: item?.quantity,
      img: item?.img,
      priceToSell:
        (item?.typePrice?.sellPricePerGram * item?.weight +
          item?.manufactureCost +
          item?.stonePrice) *
        item?.markupRate,
      priceToBuy: item?.typePrice?.buyPricePerGram * item?.weight,
    }));

    const filteredData = data.filter(
      (product) =>
        product.barcode.toLowerCase().includes(searchQuery.toLowerCase()) &&
        product.status === 0 &&
        product.counterId == auth.CounterId
    );

    setFilteredProducts(filteredData);
  }, [productsData, searchQuery, auth.CounterId]);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
      key: "no",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Image",
      align: "center",
      dataIndex: "img",
      key: "img",
      render: (img) => <Image width={50} src={img} />,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <p
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => {
            setSelectedProduct(record);
            setIsModalVisible(true);
          }}
        >
          {record.name}
        </p>
      ),
    },
    {
      title: "Barcode",
      align: "start",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Quantity",
      align: "center",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price to Sell",
      align: "end",
      dataIndex: "priceToSell",
      key: "priceToSell",
      render: (priceToSell) => formatPrice(priceToSell),
    },
    {
      title: "Price to Buy",
      align: "end",
      dataIndex: "priceToBuy",
      key: "priceToBuy",
      render: (priceToBuy) => formatPrice(priceToBuy),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record, index) => (
        <div>
          {record.status === 0 ? (
            <Badge status="success" text="Active" />
          ) : (
            <Badge status="error" text="Inactive" />
          )}
        </div>
      ),
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => onAddToCart(record)}>
            Add to Cart
          </Button>
        </>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="sub-title">Product List</h2>
      <Search
        placeholder="Search by barcode"
        enterButton="Search"
        size="middle"
        style={{ marginBottom: "20px", width: "300px" }}
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false, // Ẩn phần chọn số lượng mục hiển thị trên mỗi trang
        }}
      />
      <ProductDetailsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
      />
    </div>
  );
}
