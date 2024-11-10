import React from "react";
import { Table, Button, message, Image } from "antd";
import { formatPrice } from "../../../utils/utils";

export default function CartSpace({ cart, setCart }) {
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    message.success("Item removed from cart");
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity > item.availableQuantity) {
          message.error("Cannot add more than available quantity");
          return item;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => (
        <Image src={text} alt="Product" style={{ width: 50 }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "priceToSell",
      key: "price",
      render: (priceToSell) => formatPrice(priceToSell),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      key: "quantity",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleQuantityChange(record.id, -1)}
            disabled={record.quantity <= 1}
          >
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{record.quantity}</span>
          <Button
            onClick={() => handleQuantityChange(record.id, 1)}
            disabled={record.quantity >= record.availableQuantity}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (text, record) =>
        formatPrice(record.priceToSell * record.quantity),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="danger" onClick={() => handleRemove(record.id)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="sub-title">Shopping Cart</h2>
      <Table
        columns={columns}
        dataSource={cart}
        rowKey="id"
        summary={(pageData) => {
          let totalAmount = 0;
          pageData.forEach(({ priceToSell, quantity }) => {
            totalAmount += priceToSell * quantity;
          });
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={4}>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                {formatPrice(totalAmount)}
              </Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );
}
