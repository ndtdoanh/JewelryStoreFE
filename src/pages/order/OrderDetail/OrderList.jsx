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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/utils";

export default function OrderList({ data, loading }) {
  const navigate = useNavigate();
  const dataWithNo = data.orderDetail?.map((order, index) => ({
    ...order,
    no: index + 1,
    image: order?.products.img,
    productName: order?.products.name,
    quantity: order?.quantity,
    priceToSell: order?.unitPrice,
    totalPrice: order?.unitPrice * order?.quantity,
    status: order?.orderDetailStatus,
  }));

  const actionsMenu = (record) => (
    <Menu>
      <Menu.Item
        key="detail"
        className="submenu-usertable"
        onClick={() => navigate(`/order-detail/${record._id}`)}
      >
        <span>View Detail</span>
      </Menu.Item>
    </Menu>
  );

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
      title: "Price",
      dataIndex: "priceToSell",
      key: "price",
      render: (priceToSell) => formatPrice(priceToSell),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => formatPrice(totalPrice),
    },
    {
      title: <div style={{ textAlign: "center" }}>Status</div>,
      dataIndex: "status",
      key: "status",
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
          <Dropdown overlay={actionsMenu(record)} trigger={["click"]}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <MoreHorizIcon style={{ color: "#333333" }} />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  const totalAmount =
    dataWithNo?.reduce((total, item) => total + item.totalPrice, 0) || 0;
  const discount = data?.discount || 0;
  const totalPriceAfterDiscount = totalAmount - discount;

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
          loading={loading}
        />
      </div>
      <Flex justify="space-between" style={{ marginTop: 20, fontSize: "16px" }}>
        <div>
          <p>
            <strong>Total Amount: </strong>
          </p>
          <p>
            <strong>Discount: </strong>
          </p>
          <p style={{ fontSize: "20px ", color: "red" }}>
            <strong>Final Total: </strong>
          </p>
        </div>
        <div style={{ textAlign: "end", fontWeight: "bold" }}>
          <p> {formatPrice(totalAmount)}</p>
          <p> {formatPrice(discount)}</p>{" "}
          <p style={{ fontSize: "20px ", color: "red" }}>
            {formatPrice(totalPriceAfterDiscount)}
          </p>
        </div>
      </Flex>
    </div>
  );
}
