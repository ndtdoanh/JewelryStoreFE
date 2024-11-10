import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, ConfigProvider } from "antd";
import useSider from "@/hooks/useSider";
import { Link, useLocation } from "react-router-dom";
import HeaderPage from "../headerVsFooter/HeaderPage";
import FooterPage from "../headerVsFooter/FooterPage";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutButton from "../LogoutButton/LogoutButton"; // Import LogoutButton
import "./MainLayout.css";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth.slice";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = useSelector(selectAuth);
  const location = useLocation();

  const siderList = useSider();

  return (
    <div className="layout-container">
      <HeaderPage className="header" />
      <Layout className="content">
        <Sider width="15%" trigger={null} collapsible collapsed={collapsed}>
          <div
            style={{
              height: "100%",
              background: "#ffffff",
              flex: 1,
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Menu: {
                    iconSize: "20px",
                    itemHeight: "45px",
                    itemSelectedColor: "#ffffff",
                    itemSelectedBg: "#333333",
                    collapsedIconSize: "20px",
                  },
                },
                token: {
                  motionDurationSlow: "0.1s",
                },
              }}
            >
              <Menu
                className="navigate"
                style={{
                  height: "100%",
                  background: "#ffffff",
                  color: "#333333",
                  fontSize: "15px",
                  boxShadow: "box-shadow: 0px 3px 0px 3px rgba(0, 0, 0, 0.2);",
                }}
                theme="light"
                mode="inline"
                selectedKeys={[location.pathname.substring(1)]}
              >
                <div>
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 50,
                      height: 64,
                      color: "#333333",
                      marginLeft: "12px",
                    }}
                  />
                </div>
                {siderList.map((item) => {
                  if (item.children && item.children.length > 0) {
                    return (
                      <Menu.SubMenu
                        key={item.label}
                        icon={item.icon}
                        title={item.label}
                      >
                        {item.children.map((child) => (
                          <Menu.Item key={child.href}>
                            <Link
                              style={{ fontFamily: "Inter" }}
                              to={child.href}
                            >
                              {child.label}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.SubMenu>
                    );
                  } else {
                    return (
                      <Menu.Item key={item.href} icon={item.icon}>
                        <Link style={{ fontFamily: "Inter" }} to={item.href}>
                          {item.label}
                        </Link>
                      </Menu.Item>
                    );
                  }
                })}
                <Menu.Item key="logout" icon=<LogoutIcon />>
                  <LogoutButton />
                </Menu.Item>
              </Menu>
            </ConfigProvider>
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              width: "100%",
              overflowY: "auto",
              background: "#ffffff",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <FooterPage className="footer" />
    </div>
  );
};

export default MainLayout;
