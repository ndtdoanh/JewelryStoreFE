/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import MainLayout from "../components/layout/MainLayout";
import GuestGuard from "./GuestGuard";
import AuthGuard from "./AuthGuard";

const Login = Loadable({ loader: () => import("../pages/login/Login") });
const ForgetPassword = Loadable({
  loader: () => import("../pages/login/ForgetPassword"),
});
const LoginFirstTime = Loadable({
  loader: () => import("../pages/login/LoginFirstTime"),
});

const Counter = Loadable({
  loader: () => import("../pages/counter/Counter"),
});
const CounterDetail = Loadable({
  loader: () => import("../pages/counter/CounterDetail/CounterDetail"),
});

const CustomerPolicy = Loadable({
  loader: () => import("../pages/customerPolicy/CustomerPolicy"),
});

const Customer = Loadable({
  loader: () => import("../pages/customer/Customer"),
});

const Order = Loadable({ loader: () => import("../pages/order/Order") });
const Product = Loadable({ loader: () => import("../pages/product/Product") });
const Promotion = Loadable({
  loader: () => import("../pages/promotion/Promotion"),
});
const Employee = Loadable({
  loader: () => import("../pages/employee/Employee"),
});

const EmployeeDetail = Loadable({
  loader: () => import("../pages/employee/EmployeeDetail/EmployeeDetail"),
});
const Home = Loadable({ loader: () => import("../pages/home/Home") });
const Dashboard = Loadable({
  loader: () => import("../pages/dashboard/Dashboard"),
});
const Category = Loadable({
  loader: () => import("../pages/category/Category"),
});
const OrderDetail = Loadable({
  loader: () => import("../pages/order/OrderDetail/OrderDetail"),
});
const Sell = Loadable({
  loader: () => import("../pages/order/Sell/Sell"),
});
const Buy = Loadable({
  loader: () => import("../pages/order/Buy/Buy"),
});
const CheckoutBuyBack = Loadable({
  loader: () => import("../pages/order/Buy/Checkout"),
});
const ViewProductDetail = Loadable({
  loader: () => import("../pages/product/ProductManagement/ViewProductDetail"),
});
const ViewPromotionDetail = Loadable({
  loader: () =>
    import("../pages/promotion/PromotionManagement/ViewPromotionDetail"),
});
const Warranty = Loadable({
  loader: () => import("../pages/warranty/Warranty"),
});
const Gift = Loadable({
  loader: () => import("../pages/gift/Gift"),
});
const CancelOrder = Loadable({
  loader: () => import("../pages/order/Sell/CancelOrder"),
});

const AcceptOrder = Loadable({
  loader: () => import("../pages/order/Sell/AcceptOrder"),
});

const Transition = Loadable({
  loader: () => import("../pages/transition/Transition"),
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestGuard />,

    children: [
      {
        path: "login",
        element: Login,
      },
      // {
      //   path: "forget-password",
      //   element: ForgetPassword,
      // },
    ],
  },
  {
    path: "/",
    element: <AuthGuard />,

    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            // path: "",
            element: Home,
          },
          {
            path: "dashboard",
            element: Dashboard,
          },

          {
            path: "counter",
            element: Counter,
          },
          {
            path: "customer-policy",
            element: CustomerPolicy,
          },
          {
            path: "customer",
            element: Customer,
          },
          {
            path: "order",
            element: Order,
          },
          {
            path: "order/:id",
            element: OrderDetail,
          },
          {
            path: "product",
            element: Product,
          },
          {
            path: "view-product-detail/:productId",
            element: ViewProductDetail,
          },
          {
            path: "promotion",
            element: Promotion,
          },
          {
            path: "view-promotion-detail/:promotionCode",
            element: ViewPromotionDetail,
          },
          {
            path: "employee",
            element: Employee,
          },
          {
            path: "employee/:id",
            element: EmployeeDetail,
          },
          {
            path: "category",
            element: Category,
          },
          {
            path: "warranty",
            element: Warranty,
          },
          {
            path: "gift",
            element: Gift,
          },
          {
            path: "order/sell",
            element: Sell,
          },
          {
            path: "transition",
            element: Transition,
          },
          {
            path: "order/buy",
            element: Buy,
          },
          {
            path: "order/buy/checkout-buy-back",
            element: CheckoutBuyBack,
          },
          {
            path: "counter/:id",
            element: CounterDetail,
          },
          {
            path: "order/CancelOrder/:id",
            element: CancelOrder,
          },
          {
            path: "order/AcceptOrder/:id",
            element: AcceptOrder,
          },
        ],
      },
    ],
  },

  // {
  //   path: "login",
  //   element: Login,
  // },
  // {
  //   path: "forget-password",
  //   element: ForgetPassword,
  // },
  {
    path: "login-first-time",
    element: LoginFirstTime,
  },
  {
    path: "*",
    element: <div>404 Page not found</div>,
  },
]);
