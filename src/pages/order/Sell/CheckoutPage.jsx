import React, { useState } from "react";
import { Button, Card, message, Image, Descriptions, Radio, Input } from "antd";
import { formatPrice } from "../../../utils/utils";
import dayjs from "dayjs";
import CustomerPolicySelector from "./CustomerPolicySelector";
import CustomerPolicy from "./CustomerPolicy";

export default function CheckoutPage({
  setDiscount,
  customerInfo,
  setFinalPrice,
  cart,
  setCart,
  setPromotionCode,
  setCPId,
  setPaymentId,
  createCustomerPolicy,
  getAllCustomersPolicy,
  getPromotionById,
  setPoint,
  handleSubmit,
}) {
  const [discountType, setDiscountType] = useState("promotion");
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [customerPolicies, setCustomerPolicies] = useState([]);
  const [promotionInfo, setPromotionInfo] = useState(null);
  const [customerPolicyInfo, setCustomerPolicyInfo] = useState(null);

  const handleViewPolicy = async () => {
    try {
      const response = await getAllCustomersPolicy({
        customerId: customerInfo.customerId,
      });
      if (response.data) {
        setCustomerPolicies(response.data);
      } else {
        message.error("Failed to fetch customer policies");
      }
    } catch (error) {
      console.error("Error fetching customer policies:", error);
      message.error("An error occurred while fetching customer policies.");
    }
  };

  const handlePromotionIdChange = async () => {
    try {
      const response = await getPromotionById(discountCode);
      if (response.isSuccess) {
        const promotion = response.data;
        const currentDate = dayjs();
        const startDate = dayjs(promotion.startDate);
        const endDate = dayjs(promotion.endDate);

        if (currentDate.isBefore(startDate)) {
          message.error("The promotion has not started yet.");
          setPromotionCode(null);
          setCPId(null);
          setPromotionInfo(null);
        } else if (currentDate.isAfter(endDate)) {
          message.error("The promotion has expired.");
          setPromotionCode(null);
          setCPId(null);
          setPromotionInfo(null);
        } else {
          message.success("Promotion applied successfully.");
          setPromotionInfo(promotion);
          setPromotionCode(promotion.promotionCode);
          setCPId(null);
          setCustomerPolicyInfo(null); // Ensure customer policy info is null
        }
      } else {
        message.error(response.error.data.message);
        setPromotionCode(null);
        setPromotionInfo(null);
        setCPId(null);
      }
    } catch (error) {
      console.error("Error fetching promotion:", error);
      message.error("An error occurred while fetching promotion.");
      setPromotionCode(null);
      setCPId(null);
      setPromotionInfo(null);
    }
  };

  const totalPrice = cart.reduce(
    (sum, product) => sum + product.priceToSell * product.quantity,
    0
  );

  let discount = 0;
  if (promotionInfo) {
    if (promotionInfo.discountPercentage) {
      discount = (totalPrice * promotionInfo.discountPercentage) / 100;
    } else if (promotionInfo.fixedDiscountAmount) {
      discount = promotionInfo.fixedDiscountAmount;
    }
  } else if (customerPolicyInfo) {
    discount = (totalPrice * customerPolicyInfo.discountRate) / 100;
  }
  setDiscount(discount);

  const finalAmount = totalPrice - discount;
  const point = Math.floor(finalAmount / 10000);
  setPoint(point);
  setFinalPrice(Math.floor(finalAmount));

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

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    message.success("Item removed from cart");
  };

  const handleChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentId(e.target.value);
  };

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    if (e.target.value === "customerPolicy") {
      handleViewPolicy();
    }
  };

  const handleSelectPolicy = async () => {
    await handleViewPolicy();

    setIsSelectModalVisible(true);
  };

  const handleApplyPolicy = (policy) => {
    setCustomerPolicyInfo(policy);
    console.log(policy);
    setCPId(policy.cpId);
    setIsSelectModalVisible(false);
    setPromotionCode(null);
    setPromotionInfo(null); // Ensure promotion info is null
    message.success("Customer policy applied successfully.");
  };

  return (
    <div className="checkout-page">
      <p className="sub-title">Cart List</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {cart.map((product) => (
            <Card key={product.id} style={{ marginBottom: 2, width: "600px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src={product.img || "https://via.placeholder.com/150"}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
                <div style={{ flex: 1 }}>
                  <p>{product.name}</p>
                  <p>{formatPrice(product.priceToSell)} VNĐ</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    disabled={product.quantity <= 1}
                  >
                    -
                  </Button>
                  <span style={{ margin: "0 10px" }}>{product.quantity}</span>
                  <Button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    disabled={product.quantity >= product.availableQuantity}
                  >
                    +
                  </Button>
                </div>
                <div>
                  <Button type="link" onClick={() => handleRemove(product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Card style={{ width: "600px" }}>
            <p>Information</p>
            <hr />
            <Descriptions column={1}>
              <Descriptions.Item label="Customer">
                {customerInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {customerInfo.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {customerInfo.address}
              </Descriptions.Item>
            </Descriptions>
            <hr />
            <p>Apply Discount:</p>
            <Radio.Group
              onChange={handleDiscountTypeChange}
              value={discountType}
            >
              <Radio value="promotion">Promotion</Radio>
              <Radio value="customerPolicy">Customer Policy</Radio>
            </Radio.Group>
            {discountType === "promotion" && (
              <>
                <div style={{ marginTop: 10 }}>
                  <Input
                    placeholder="Enter promotion ID"
                    value={discountCode}
                    onChange={handleChange}
                    onPressEnter={handlePromotionIdChange}
                    style={{ width: 200 }}
                  />
                  <Button
                    type="primary"
                    style={{ marginLeft: 10 }}
                    onClick={handlePromotionIdChange}
                  >
                    Search
                  </Button>
                </div>
                {promotionInfo && (
                  <Descriptions column={1} style={{ marginTop: 10 }}>
                    <Descriptions.Item label="Promotion Code">
                      {promotionInfo.promotionCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {promotionInfo.description}
                    </Descriptions.Item>
                    {promotionInfo.discountPercentage !== 0 && (
                      <Descriptions.Item label="Discount Percentage">
                        {promotionInfo.discountPercentage
                          ? `${promotionInfo.discountPercentage}%`
                          : "N/A"}
                      </Descriptions.Item>
                    )}
                    {promotionInfo.fixedDiscountAmount !== 0 && (
                      <Descriptions.Item label="Fixed Discount Amount">
                        {promotionInfo.fixedDiscountAmount
                          ? `${formatPrice(promotionInfo.fixedDiscountAmount)}`
                          : "N/A"}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Start Date">
                      {dayjs(promotionInfo.startDate).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                      {dayjs(promotionInfo.endDate).format("HH:mm DD/MM/YYYY")}
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </>
            )}
            {discountType === "customerPolicy" && (
              <div style={{ marginTop: 10 }}>
                <Button onClick={() => setIsRequestModalVisible(true)}>
                  Send Request
                </Button>
                <Button type="primary" onClick={handleSelectPolicy}>
                  Select Customer Policy
                </Button>
                {customerPolicyInfo && (
                  <Descriptions column={1} style={{ marginTop: 10 }}>
                    <Descriptions.Item label="Discount Percentage">
                      {customerPolicyInfo.discountRate
                        ? `${customerPolicyInfo.discountRate}%`
                        : "N/A"}
                    </Descriptions.Item>

                    <Descriptions.Item label="Start Date">
                      {dayjs(customerPolicyInfo.validFrom).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                      {dayjs(customerPolicyInfo.validTo).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                )}
              </div>
            )}
            <hr />
            <p>Payment Method:</p>
            <Radio.Group
              onChange={handlePaymentMethodChange}
              value={paymentMethod}
            >
              <Radio se value={1}>
                Cash
              </Radio>
              <Radio value={2}>Mobile Banking</Radio>
            </Radio.Group>
            <hr />
            <Descriptions column={1}>
              <Descriptions.Item label="Total Price">
                {formatPrice(totalPrice)}
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                {formatPrice(discount)}
              </Descriptions.Item>
              <Descriptions.Item label="Final Amount">
                {formatPrice(finalAmount)}
              </Descriptions.Item>
            </Descriptions>
            <Button
              onClick={handleSubmit}
              type="primary"
              style={{ marginTop: 10 }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      </div>
      <CustomerPolicy
        visible={isRequestModalVisible}
        customerId={customerInfo.customerId}
        createCustomerPolicy={createCustomerPolicy}
        onClose={() => setIsRequestModalVisible(false)}
      />
      <CustomerPolicySelector
        visible={isSelectModalVisible}
        customerPolicies={customerPolicies}
        onApplyPolicy={handleApplyPolicy}
        onCancel={() => setIsSelectModalVisible(false)}
      />
    </div>
  );
}
