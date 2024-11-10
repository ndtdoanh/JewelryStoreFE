import React from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { RiShoppingBagLine, RiShoppingCartLine } from "@remixicon/react";

export default function OrderModal({ visible, onCancel }) {
  const navigate = useNavigate();

  const handleSellClick = () => {
    navigate("/order/sell");
  };

  const handleBuyClick = () => {
    navigate("/order/buy");
  };

  return (
    <Modal
      title="Make Order"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 30 }}
      >
        <Button
          style={{
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
          type="primary"
          onClick={handleSellClick}
        >
          <RiShoppingCartLine />
          Sell
        </Button>
        <Button
          style={{
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
          type="primary"
          onClick={handleBuyClick}
        >
          <RiShoppingBagLine />
          Repurchased
        </Button>
      </div>
    </Modal>
  );
}
