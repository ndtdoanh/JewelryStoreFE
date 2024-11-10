import React from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";
import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const roleMapping = {
  1: "Staff",
  2: "Manager",
  3: "Admin",
  4: "Super Admin",
};

const Home = () => {
  const auth = useSelector(selectAuth);
  const roleName = roleMapping[auth?.Role];
  const navigate = useNavigate();

  const handleMakeOrder = () => {
    navigate("/order/sell"); // Chuyển hướng đến đường dẫn "/make-order"
  };
  const handleMakeRepurchased = () => {
    navigate("/order/buy"); // Chuyển hướng đến đường dẫn "/make-order"
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Card>
        <Title level={2}>Welcome, {auth?.EmployeeName}</Title>
        <p>Email: {auth?.Email}</p>
        <p>Role: {roleName}</p>
        <p>Counter: {auth.CounterName}</p>
      </Card>

      <div style={{ marginTop: "20px" }}>
        <Button
          onClick={handleMakeOrder}
          type="primary"
          style={{ marginRight: "10px" }}
        >
          Make Order
        </Button>
        <Button onClick={handleMakeRepurchased} type="primary">
          Make Repurchased
        </Button>
        {/* Add more buttons as needed for making orders */}
      </div>
    </div>
  );
};

export default Home;
