import React, { useState } from "react";
import { Button, Flex, Input, message } from "antd";
import Search from "antd/es/input/Search";
import CustomerInformation from "./CustomerInformation";
import ProductSpace from "./ProductSpace";
import CartSpace from "./CartSpace";
import CheckoutPage from "./CheckoutPage"; // New component
import "./Sell.css";
import { useGetProductsQuery } from "../../../services/productAPI";
import { useLazyGetCustomerByPhoneQuery } from "../../../services/customerAPI"; // Changed to lazy query
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../slices/auth.slice";
import {
  useAddOrderSellingMutation,
  useAddPaymentMutation,
  useUpdateOrderCompleteMutation,
} from "../../../services/orderAPI";
import dayjs from "dayjs";
import {
  useCreateCustomerPolicyMutation,
  useLazyGetAllCustomersPolicyByCustomerIdQuery,
  useUpdateUsedPolicyMutation,
} from "../../../services/customerPolicyAPI";
import { useLazyGetPromotionByIdQuery } from "../../../services/promotionAPI";

export default function Sell() {
  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1 for Sell, 2 for Checkout
  const { data: productsData, refetch, isFetching } = useGetProductsQuery();
  const [customerInfo, setCustomerInfo] = useState({});
  const [promotionCode, setPromotionCode] = useState(null);
  const [CPId, setCPId] = useState(null);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [point, setPoint] = useState(0);
  const [paymentId, setPaymentId] = useState(1);
  const [getCustomerByPhone, { data: customerData, error: customerError }] =
    useLazyGetCustomerByPhoneQuery(); // Changed to lazy query
  const [getAllCustomersPolicy] =
    useLazyGetAllCustomersPolicyByCustomerIdQuery();
  const [createCustomerPolicy] = useCreateCustomerPolicyMutation();
  const [getPromotionById, { loading, data, error }] =
    useLazyGetPromotionByIdQuery();
  const [orderInfo, setOrderInfo] = useState();
  const [addSelling] = useAddOrderSellingMutation();
  const [makePayment] = useAddPaymentMutation();
  const [usedPolicy] = useUpdateUsedPolicyMutation();
  const [changeStatusCompleteOrder] = useUpdateOrderCompleteMutation();
  const orderId = dayjs().format("MMDDHHmmss").toString();
  console.log(finalPrice);

  const handleSubmit = async () => {
    const payload = {
      orderId: orderId,
      customerId: customerInfo.customerId,
      discount: discount,
      promotionCode: promotionCode || null,
      cpId: CPId || null,
      accumulatedPoint: point,
      counterId: Number(auth.CounterId),
      paymentId: paymentId,
      orderDetail: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.priceToSell,
        manufactureCost: item.manufactureCost,
      })),
    };

    console.log(payload);
    try {
      const response = await addSelling(payload);
      console.log(response);
      if (response.error.originalStatus === 200) {
        if (CPId !== null) {
          const usedPolicyNe = await usedPolicy({ CPId: CPId });
          console.log(usedPolicyNe);
          message.success("Use policy success!");
        }
        if (paymentId === 1) {
          const changeStatusOrder = await changeStatusCompleteOrder({
            orderId: orderId,
          });
          console.log(changeStatusOrder);
          message.success("Order complete success!");
          navigate(`/order/${orderId}`);
        }
        if (paymentId === 2) {
          const payload = {
            orderId: orderId,
            description: orderId,
            priceTotal: finalPrice,
            counterId: Number(auth.CounterId),
            returnUrl: `http://localhost:3000/order/AcceptOrder/${orderId}`,
            cancelUrl: `http://localhost:3000/order/CancelOrder/${orderId}`,
            items: cart.map((item) => ({
              productName: item.name,
              quantity: item.quantity,
              priceSingle: item.priceToSell,
            })),
          };
          const response = await makePayment(payload);
          console.log(response);

          // const changeStatusOrder = await changeStatusCompleteOrder({
          //   orderId: orderId,
          // });
          message.success("MakePayemnt success!");
          window.location.href = response.error.data;
        }

        message.success("Sale successfully!");
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

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    const existingQuantity = existingProduct ? existingProduct.quantity : 0;

    if (existingQuantity + 1 > product.quantity) {
      message.error("Cannot add more than available quantity");
      return;
    }

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...product, quantity: 1, availableQuantity: product.quantity },
      ]);
    }
  };

  const onSearch = async (value) => {
    try {
      const result = await getCustomerByPhone(value).unwrap();
      console.log(result);
      setCustomerInfo(result);
      message.success("Customer found!");
    } catch (error) {
      setCustomerInfo({});
      message.error("Customer not found!");
    }
  };

  const handleCheckout = () => {
    if (!customerInfo || Object.keys(customerInfo).length === 0) {
      message.warning("Customer not found");
      return;
    }
    if (cart.length === 0) {
      message.warning("Cart is empty");
      return;
    }
    setStep(2); // Move to checkout step
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCancel = () => {
    navigate("/order");
  };

  const handleCreateCustomer = async () => {
    // try {
    //   const response = await createCustomerPolicy(/* Pass necessary data */);
    //   console.log(response);
    //   if (response.data) {
    //     message.success("Customer created successfully!");
    //     // Optionally update customer list or UI here
    //   } else {
    //     message.error("Error creating customer");
    //   }
    // } catch (error) {
    //   console.error("Error creating customer:", error);
    //   message.error("An error occurred while creating the customer.");
    // }
    navigate("/customer");
  };

  const filteredProductsData = productsData?.filter(
    (product) => product.status === 0 && product.counterId === auth.CounterId
  );

  return (
    <>
      <div className="sell-page">
        <div className="header">
          <h1 className="title">Make Sell</h1>
          <hr />
        </div>
        <div className="body">
          {step === 1 && (
            <>
              <div className="action">
                <div className="action-left">
                  <Search
                    style={{ borderRadius: 20, width: 300 }}
                    placeholder="Search by customer phone..."
                    onSearch={onSearch}
                    enterButton
                  />
                </div>
                <div className="action-left">
                  <Button
                    style={{
                      backgroundColor: "#333333",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                    onClick={handleCreateCustomer}
                  >
                    Create Customer
                  </Button>
                </div>
              </div>
              <div className="customer-information">
                <CustomerInformation customerInfo={customerInfo} />
              </div>
              <div className="product-space">
                <ProductSpace
                  productsData={productsData}
                  onAddToCart={handleAddToCart}
                  auth={auth}
                />
              </div>
              <div className="cart-information">
                <CartSpace cart={cart} setCart={setCart} />
              </div>
              <Flex justify="space-between">
                <Button onClick={handleCancel} type="primary">
                  Cancel
                </Button>
                <Button onClick={handleCheckout} type="primary">
                  Checkout
                </Button>
              </Flex>
            </>
          )}
          {step === 2 && (
            <>
              <CheckoutPage
                setCPId={setCPId}
                setPromotionCode={setPromotionCode}
                customerInfo={customerInfo}
                cart={cart}
                setPoint={setPoint}
                setPaymentId={setPaymentId}
                setDiscount={setDiscount}
                setCart={setCart}
                createCustomerPolicy={createCustomerPolicy} // Truyền hàm tạo chính sách khách hàng vào
                getAllCustomersPolicy={getAllCustomersPolicy} // Truyền hàm lấy tất cả chính sách khách hàng vào
                getPromotionById={getPromotionById} // Truyền hàm lấy khuyến mãi theo id vào
                handleSubmit={handleSubmit}
                setFinalPrice={setFinalPrice}
              />
              <br />
              <br />
              <Flex justify="space-between">
                <Button onClick={handleBack} type="primary">
                  Back Add to Cart
                </Button>
                <Button onClick={handleSubmit} type="primary">
                  Make Sell
                </Button>
              </Flex>
            </>
          )}
        </div>
      </div>
    </>
  );
}
