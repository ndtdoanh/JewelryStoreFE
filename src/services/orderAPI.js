import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const orderAPI = createApi({
  reducerPath: "orderManagement",
  tagTypes: ["OrderList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // Retrieve token from Redux state using selectToken selector
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `Order/GetAllOrders`,

      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "orderManagement", id })),
              { type: "OrderList", id: "LIST" },
            ]
          : [{ type: "OrderList", id: "LIST" }],
    }),
    getOrderById: builder.query({
      query: (id) => `Order/GetOrdersByOrderId?orderId=${id}`,
      providesTags: (result, _error, _arg) => {
        if (result) {
          return [
            { type: "Order", id: result.orderId },
            { type: "OrderList", id: "LIST" },
          ];
        } else {
          return [{ type: "OrderList", id: "LIST" }];
        }
      },
    }),

    addOrderSelling: builder.mutation({
      query: (payload) => ({
        url: `/Order/AddNewSelling`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
    addOrderBuying: builder.mutation({
      query: (payload) => ({
        url: `/Order/AddNewBuyBack`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
    addPayment: builder.mutation({
      query: (payload) => ({
        url: `/Payment/CreatePayment`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "PaymentList", id: "LIST" }],
    }),
    updateOrderComplete: builder.mutation({
      query: ({ orderId }) => ({
        url: `/Order/UpdateOrderStatus?orderId=${orderId}`,
        method: "PUT",
        body: {
          orderStatus: 2,
        },
      }),
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
    updateOrderCancel: builder.mutation({
      query: ({ orderId }) => ({
        url: `/Order/UpdateOrderStatus?orderId=${orderId}`,
        method: "PUT",
        body: {
          orderStatus: 3,
        },
      }),
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
    undoOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/Order/UndoPointQuantity?orderId=${orderId}`,
        method: "PUT",
        body: {
          orderStatus: 2,
        },
      }),
      invalidatesTags: [{ type: "OrderList", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useAddOrderSellingMutation,
  useAddPaymentMutation,
  useUpdateOrderCompleteMutation,
  useGetOrderByIdQuery,
  useLazyGetOrderByIdQuery,
  useAddOrderBuyingMutation,
  useUndoOrderMutation,
  useUpdateOrderCancelMutation,
} = orderAPI;
