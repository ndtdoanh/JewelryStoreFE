import { useMemo } from "react";
import {
  UserOutlined,
  HomeOutlined,
  AreaChartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UsergroupDeleteOutlined,
  TagOutlined,
  PercentageOutlined,
  FileProtectOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth.slice";

const useSider = () => {
  const auth = useSelector(selectAuth);
  const role = auth?.Role || ""; // Kiểm tra xem Role có tồn tại

  const siderList = useMemo(() => {
    const list = [
      {
        label: "Home",
        icon: <HomeOutlined />,
        href: "",
        roles: ["1", "2", "3", "4"],
      },
      // {
      //   label: "Dashboard",
      //   icon: <AreaChartOutlined />,
      //   href: "dashboard",
      //   roles: ["1", "2", "3", "4"],
      // },
      {
        label: "Product",
        icon: <ShoppingOutlined />,
        href: "product",
        roles: ["1", "2", "3", "4"],
      },
      {
        label: "Order",
        icon: <ShoppingCartOutlined />,
        href: "order",
        roles: ["1", "2", "3", "4"],
      },
      {
        label: "Customer",
        icon: <UsergroupDeleteOutlined />,
        href: "customer",
        roles: ["1", "2", "3", "4"],
      },
      {
        label: "Customer Policy",
        icon: <UsergroupDeleteOutlined />,
        href: "customer-policy",
        roles: ["2", "3", "4"],
      },
      {
        label: "Employee",
        icon: <UserOutlined />,
        href: "employee",
        roles: ["2", "3", "4"],
      },
      {
        label: "Counter",
        icon: <TagOutlined />,
        href: "counter",
        roles: ["1", "2", "3", "4"],
      },
      {
        label: "Promotion",
        icon: <PercentageOutlined />,
        href: "promotion",
        roles: ["2", "3", "4"],
      },
      // {
      //   label: "Warranty",
      //   icon: <FileProtectOutlined />,
      //   href: "warranty",
      //   roles: ["1", "2", "3", "4"],
      // },
      {
        label: "Gift",
        icon: <GiftOutlined />,
        href: "gift",
        roles: ["1", "2", "3", "4"],
      },
      {
        label: "Transition",
        icon: <GiftOutlined />,
        href: "transition",
        roles: ["1", "2", "3", "4"],
      },
    ];

    return list.filter((item) => item.roles.includes(role));
  }, [role]);

  return siderList;
};

export default useSider;
