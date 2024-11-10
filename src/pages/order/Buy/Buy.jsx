import React, { useState } from "react";
import Information from "./Information";
import "./Buy.css";
import { Button, Flex, Input, message, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProductInformation from "./ProductInformation";
import {
  useAddOrderBuyingMutation,
  useLazyGetOrderByIdQuery,
} from "../../../services/orderAPI";
import CheckoutBuy from "./Checkout";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";

export default function Buy() {
  const [searchQuery, setSearchQuery] = useState("");
  const [orderInfo, setOrder] = useState(null);
  const [step, setStep] = useState(1); // 1 for Sell, 2 for Checkout
  const [buyBackInfo, setBuyBackInfo] = useState();
  const navigate = useNavigate();
  const [trigger, { data: orderData, error, isLoading }] =
    useLazyGetOrderByIdQuery();
  const [addBuying] = useAddOrderBuyingMutation();
  const auth = useSelector(selectAuth);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      trigger(searchQuery).then((response) => {
        if (response?.data) {
          if (response?.data.type === 0) {
            message.error("This is order ID of buy back");
            return;
          }
          if (response?.data.orderStatus === 3) {
            message.error("This is order ID is cancelled");
            return;
          }
          setOrder(response.data);
        }
      });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCancel = () => {
    navigate("/order");
  };

  const handleBuyBack = (e) => {
    setBuyBackInfo(e);
    setStep(2); // Move to checkout step
  };
  console.log(buyBackInfo);
  console.log(orderInfo);
  const orderId = dayjs().format("MMDDHHmmss").toString();

  const handleSubmit = async () => {
    const payload = {
      orderId: orderId,
      customerId: orderInfo?.customer.customerId,
      counterId: Number(auth.CounterId),
      paymentId: 1,
      orderDetailID: buyBackInfo?.orderDetailId,
      buyBack: {
        productId: buyBackInfo?.products.productId,
        price: buyBackInfo?.priceToBuy,
        quantity: buyBackInfo?.quantity,
        haveInvoice: true,
        manufactureCost: buyBackInfo?.manufactureCost,
      },
    };
    console.log(payload);
    try {
      const response = await addBuying(payload);
      console.log(response);
      if (response.error.originalStatus === 200) {
        message.success("Order complete success!");
        navigate(`/order/${orderId}`);
        // setCart([]);
        // setCustomerInfo({});
        // navigate("/order");
        // setStep(1);
      } else {
        message.error(response.error.data);
      }
    } catch (error) {
      console.log(error);
      console.error("Error submitting sale:", error);
      message.error("An error occurred while submitting the sale.");
    }
  };

  return (
    <div className="buy-back-page">
      <div className="header">
        <h1 className="title">Make Repurchased</h1>
        <hr />
      </div>
      {step === 1 && (
        <div className="body">
          <div className="search-order">
            <Input
              style={{ borderRadius: 20, width: "350px" }}
              size="large"
              placeholder="Search by Order Code"
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          {isLoading ? (
            <Spin />
          ) : error ? (
            <div>Error fetching order data.</div>
          ) : orderInfo ? (
            <>
              <div className="information">
                <Information orderInfo={orderInfo} data={orderInfo} />
              </div>
              <div className="product-information">
                <ProductInformation
                  onBuyBackData={handleBuyBack}
                  data={orderInfo}
                />
              </div>
            </>
          ) : (
            <div>Please enter an order code to search.</div>
          )}
          <Flex justify="space-between">
            <Button onClick={handleCancel} type="primary">
              Cancel
            </Button>
          </Flex>
        </div>
      )}
      {step === 2 && (
        <>
          <CheckoutBuy buyBackInfo={buyBackInfo} orderInfo={orderInfo} />
          <Flex justify="space-between">
            <Button onClick={handleBack} type="primary">
              Back
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Make Repurchased
            </Button>
          </Flex>
        </>
      )}
    </div>
  );
}
