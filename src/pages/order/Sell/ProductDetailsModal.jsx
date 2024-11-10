import React from "react";
import { Modal, Button, Descriptions } from "antd";
import { formatPrice } from "../../../utils/utils";

const ProductDetailsModal = ({ visible, onClose, product }) => {
  return (
    <Modal
      title="Product Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {product && (
        <Descriptions bordered>
          <Descriptions.Item label="Product Name" span={3}>
            {product.name}
          </Descriptions.Item>
          <Descriptions.Item label="Barcode" span={3}>
            {product.barcode}
          </Descriptions.Item>
          <Descriptions.Item label="Type" span={3}>
            {product.typeName}
          </Descriptions.Item>
          <Descriptions.Item label="Price to Sell" span={3}>
            {formatPrice(product.priceToSell)}
          </Descriptions.Item>
          <Descriptions.Item label="Price to Buy" span={3}>
            {formatPrice(product.priceToBuy)}
          </Descriptions.Item>
          <Descriptions.Item label="Manufacture Cost" span={3}>
            {formatPrice(product.manufactureCost)}
          </Descriptions.Item>
          <Descriptions.Item label="Stone Price" span={3}>
            {formatPrice(product.stonePrice)}
          </Descriptions.Item>
          <Descriptions.Item label="Markup Rate" span={3}>
            {product.markupRate}
          </Descriptions.Item>
          <Descriptions.Item label="Weight" span={3}>
            {product.weight}
          </Descriptions.Item>
          <Descriptions.Item label="Quantity" span={3}>
            {product.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={3}>
            {product.status === 0 ? "Active" : "Inactive"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
};

export default ProductDetailsModal;
