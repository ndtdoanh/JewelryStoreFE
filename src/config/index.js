const publicRuntimeConfig = {
  API_URL: import.meta.env.VITE_API_URL,
  USER_API_URL: import.meta.env.VITE_USER_MANAGE,
  // PRODUCT_API: import.meta.env.VITE_PRODUCT_MANAGE,
  ORDER_API: import.meta.env.VITE_ORDER_MANAGE,
  CUSTOMER_API: import.meta.env.VITE_CUSTOMER_MANAGE,
  PRODUCT_API: import.meta.env.VITE_PRODUCT_MANAGE,
  PROMOTION_API: import.meta.env.VITE_PROMOTION_MANAGE,


  // create fake token here
};

export const { API_URL, USER_API_URL, PRODUCT_API, ORDER_API, CUSTOMER_API, PROMOTION_API } =
  publicRuntimeConfig;
export default publicRuntimeConfig;
