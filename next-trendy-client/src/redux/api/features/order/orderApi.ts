import { data } from './../../../../utils/items/index';
import { baseApi } from "../../baseApi";


const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => {
        console.log(data,'redux');
        
        return {
          url: "/order/create-order",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          data,
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
