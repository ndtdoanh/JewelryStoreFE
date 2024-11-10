import {
  Button,
  Dropdown,
  Flex,
  Image,
  Menu,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs from "dayjs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/utils";

export default function ProductInformation({ data, onBuyBackData }) {
  const navigate = useNavigate();
  const dataWithNo = data.orderDetail?.map((order, index) => ({
    ...order,
    no: index + 1,

    orderDetailId: order?.orderDetailId,
    orderDetailStatus: order?.orderDetailStatus,
    productId: order?.productId,
    barcode: order?.products.barcode,
    manufactureCost: order?.products.manufactureCost,
    markupRate: order?.products.markupRate,
    image: order?.products.img,
    weight: order?.products.weight,
    typeBuyGram: order?.products.typePrice.buyPricePerGram,
    typeName: order?.products.typePrice.typeName,
    productName: order?.products.name,
    quantity: order?.quantity,
    priceToSell: order?.unitPrice,
    priceToBuy:
      order?.products.typePrice.buyPricePerGram * order?.products.weight,
    totalPrice: order?.unitPrice * order?.quantity,
  }));

  const handleBuyBack = (record) => {
    // navigate("checkout-buy-back", { state: { orderDetail: record } });
    onBuyBackData(record);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 55,
    },
    {
      title: "Image",
      align: "center",
      dataIndex: "image",
      key: "img",
      render: (image) => <Image width={50} src={image} />,
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price Sell",
      dataIndex: "priceToSell",
      key: "priceToSell",
      render: (priceToSell) => formatPrice(priceToSell),
    },
    {
      title: "Price Buy",
      dataIndex: "priceToBuy",
      key: "priceToBuy",
      render: (priceToBuy) => formatPrice(priceToBuy),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "orderDetailStatus",
      key: "orderDetailStatus",
      render: (status) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            color={status === 0 ? "gold" : status === 1 ? "warning" : "error"}
          >
            {status === 0 ? "Sold" : status === 1 ? "Buy Back" : "NaN"}
          </Tag>
        </div>
      ),
    },
    {
      width: 55,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleBuyBack(record)}>Buy Back</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <h1 className="sub-title">Cart Information</h1>
      </div>
      <div style={{ marginTop: 10 }}>
        <Table
          columns={columns}
          dataSource={dataWithNo}
          rowKey="id"
          // pagination={{ pageSize: 4 }}
        />
      </div>
    </div>
  );
}
