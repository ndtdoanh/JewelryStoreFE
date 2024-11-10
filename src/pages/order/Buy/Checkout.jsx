import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Flex, Image, Table, Tag } from "antd";
import { formatPrice } from "../../../utils/utils";

export default function CheckoutBuy({ buyBackInfo, orderInfo }) {
  return (
    <div>
      <div>
        <Card>
          <h2 className="sub-title">Buy Back Information</h2>
          <hr />
          <p>Name: {orderInfo?.customer.name}</p>
          <p>Phone Name: {orderInfo?.customer.phone}</p>
          <p>Address Name: {orderInfo?.customer.address}</p>
          <hr />
          <div style={{ marginTop: 30 }}>
            <Flex gap={30}>
              <Image width={300} src={buyBackInfo.image} />
              <div>
                <p>
                  {" "}
                  <strong>Product name: </strong>
                  {buyBackInfo.productName}
                </p>
                <p>
                  <strong>Weight:</strong> {buyBackInfo.weight}
                </p>
                <p>
                  <strong>Type:</strong> {buyBackInfo.typeName}
                </p>
                <p>
                  <strong>Quantity:</strong> {buyBackInfo.quantity}
                </p>
                <p>
                  <strong>Price to buy:</strong>{" "}
                  {formatPrice(buyBackInfo.priceToBuy)}
                </p>
              </div>
            </Flex>
          </div>
          <Flex
            justify="space-between"
            style={{ marginTop: 20, fontSize: 24, color: "red" }}
          >
            <strong>Total:</strong>
            <strong>{formatPrice(buyBackInfo.priceToBuy)}</strong>
          </Flex>
        </Card>
        <p>{/* {formatPrice(totalAmount)} */}</p>
      </div>
    </div>
  );
}
