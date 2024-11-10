import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, ConfigProvider, notification } from "antd";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/auth.slice";
import { useLogoutMutation } from "../../services/authAPI";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // await logoutApi().unwrap();
      dispatch(logout());
      notification.success({
        message: "Logout successfully",
        description: "See you again!",
      });
    } catch (error) {
      notification.error({
        message: "Logout failed",
        description: "Please try again!",
      });
    }
  };

  return (
    <div className="logout-btn" onClick={handleLogout}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#a6a6a6",
            colorTextLightSolid: "#000000",
          },
        }}
      >
        {/* Uncomment the Button if you want to use it */}
        {/* <Button type="primary" icon={<LogoutIcon fontSize="15px" />}> */}
        Logout
        {/* </Button> */}
      </ConfigProvider>
    </div>
  );
}
