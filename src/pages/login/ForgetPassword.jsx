import React, { useEffect, useState } from "react"; // Import React
import "./Login.css";
import { Alert, Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../slices/auth.slice";

function Login() {
  const [form] = Form.useForm(); // Sử dụng hook Form của Ant Design
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useSelector(selectToken);

  const [error, setError] = useState(null); // Khai báo state error
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyEmail, setVerifyEmail] = useState(false); // Khai báo state error
  const [verifyOTP, setVerifyOTP] = useState(false); // Khai báo state error

  //////////////////////////////////////// Dieu kien chuyen trang
  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  const handleVerifyEmail = () => {
    // console.log(email);
    setVerifyEmail(true);
  };

  const handleVerifyOTP = () => {
    setVerifyOTP(true);
  };

  const handleChangePassword = async (e) => {
    // e.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    if (!confirmPassword.trim()) {
      setError("Confirm Password is required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Confirm Password does not match");
      return;
    }
    setVerifyEmail(false);
    setVerifyOTP(false);
    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-space">
        <h1 className="title"> Luminary</h1>
        <h3 className="sub-title">Forgotten Password</h3>

        {!verifyEmail && (
          <Form form={form} className="login-form" onFinish={handleVerifyEmail}>
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <p>Email Address</p>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  pattern: /^[\w-]+(\.[\w-]+)*@(gmail\.com|fpt\.edu\.vn)$/,
                  message: "Please input valid Email!",
                },
              ]}
            >
              <Input
                type=""
                placeholder="your@email.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Verify Email
              </Button>
            </Form.Item>
          </Form>
        )}
        {verifyEmail && !verifyOTP && (
          <Form form={form} className="login-form" onFinish={handleVerifyOTP}>
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <p>OTP</p>
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please input OTP!",
                },
              ]}
            >
              <Input
                type=""
                placeholder="your OTP"
                className="form-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Verify OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {verifyEmail && verifyOTP && (
          <Form
            form={form}
            className="login-form"
            onFinish={handleChangePassword}
          >
            <p>New Password</p>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <p>Confirm Password</p>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            {error && (
              <>
                <Alert message={error} type="error" showIcon />
                <br />
              </>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Change your password
              </Button>
            </Form.Item>
          </Form>
        )}

        <div className="back-to-login">
          <p>
            <Link to={"/login"}>Back to login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
