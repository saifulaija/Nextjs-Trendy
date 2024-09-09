import { baseApi } from "../../baseApi";


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => {
        return {
          url: "/order/create-order",
          method: "POST",
          body: orderInfo,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
